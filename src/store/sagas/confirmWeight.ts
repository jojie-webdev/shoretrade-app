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

import { confirmWeightActions, getSellerOrdersPlacedActions } from '../actions';

function* confirmWeightRequest(
  action: AsyncAction<ConfirmWeightMeta, ConfirmWeightPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(confirmWeight, action.meta, state.auth.token);
      yield put(
        confirmWeightActions.success({ ...data, orderId: action.meta.orderId })
      );
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
  // yield put(getSellerOrdersPlacedActions.request());
  console.log(action);
  yield put(
    getSellerOrdersPlacedActions.updateOptimistically(
      action.payload.orderId,
      action.payload.orderLineItemId
    )
  );
  // yield put(push(SELLER_SOLD_ROUTES.LANDING));
}

function* confirmWeightWatcher() {
  yield takeLatest(confirmWeightActions.REQUEST, confirmWeightRequest);
  yield takeLatest(confirmWeightActions.SUCCESS, confirmWeightSuccess);
}

export default confirmWeightWatcher;
