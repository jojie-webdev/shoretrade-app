import { push } from 'connected-react-router';
import { SELLER_SOLD_ROUTES } from 'consts';
import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { confirmWeight } from 'services/orders';
import { AsyncAction } from 'types/Action';
import {
  ConfirmWeightMeta,
  ConfirmWeightPayload,
} from 'types/store/ConfirmWeightState';
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
  action: AsyncAction<ConfirmWeightMeta, ConfirmWeightPayload>
) {
  yield put(getSellerOrdersPendingActions.request({ page: '1' }));
  // yield put(getSellerOrdersPlacedActions.request({ page: '1' }));
  // yield put(
  //   getSellerOrdersPendingActions.updateOptimistically(action.payload.meta)
  // );
}

function* confirmWeightWatcher() {
  yield takeLatest(confirmWeightActions.REQUEST, confirmWeightRequest);
  yield takeLatest(confirmWeightActions.SUCCESS, confirmWeightSuccess);
}

export default confirmWeightWatcher;
