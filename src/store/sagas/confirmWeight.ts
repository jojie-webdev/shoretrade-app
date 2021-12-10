import { DEFAULT_PAGE_LIMIT } from 'consts';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { confirmWeight, getAllSellerOrders } from 'services/orders';
import { Action, AsyncAction } from 'types/Action';
import {
  ConfirmWeightMeta,
  ConfirmWeightPayload,
} from 'types/store/ConfirmWeightState';
import { GetAllSellerOrdersMeta } from 'types/store/GetAllSellerOrdersState';
import { Store } from 'types/store/Store';

import {
  confirmWeightActions,
  getSellerOrdersPendingActions,
} from '../actions';

function* confirmWeightRequest(
  action: AsyncAction<ConfirmWeightMeta, ConfirmWeightPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(confirmWeight, action.meta, state.auth.token);
      yield put(confirmWeightActions.success({ ...data, meta: action.meta }));
    } catch (e) {
      yield put(confirmWeightActions.failed(e.message));
    }
  } else {
    yield put(confirmWeightActions.failed('Token not found'));
  }
}

function* confirmWeightSuccess(
  action: Action<ConfirmWeightPayload & { meta: ConfirmWeightMeta }>
) {
  // Note: this simulates the getSellerOrdersPendingActions.request but
  // without touching other fields such as "pending" to avoid rerender of whole screen
  const state: Store = yield select();
  const meta: GetAllSellerOrdersMeta = {
    status: 'PENDING',
    limit: DEFAULT_PAGE_LIMIT,
    page: state.getSellerOrdersPending.request?.page || '1',
    term: state.getSellerOrdersPending.request?.term,
  };
  if (state.auth.token) {
    try {
      const { data } = yield call(getAllSellerOrders, meta, state.auth.token);
      yield put(getSellerOrdersPendingActions.patch(data));
    } catch (e) {
      yield put(getSellerOrdersPendingActions.failed(e.message));
    }
  } else {
    yield put(getSellerOrdersPendingActions.failed('Token not found'));
  }
}

function* confirmWeightWatcher() {
  yield takeLatest(confirmWeightActions.REQUEST, confirmWeightRequest);
  yield takeLatest(confirmWeightActions.SUCCESS, confirmWeightSuccess);
}

export default confirmWeightWatcher;
