import { put, call, takeLatest, select } from 'redux-saga/effects';
import { placeOrder } from 'services/orders';
import { AsyncAction } from 'types/Action';
import { PlaceOrderMeta, PlaceOrderPayload } from 'types/store/PlaceOrderState';
import { Store } from 'types/store/Store';

import {
  placeOrderActions,
  getSellerOrdersPendingActions,
  getSellerOrdersPlacedActions,
} from '../actions';

function* placeOrderRequest(
  action: AsyncAction<PlaceOrderMeta, PlaceOrderPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(placeOrder, action.meta, state.auth.token);
      yield put(
        placeOrderActions.success({ ...data, orderId: action.meta.orderId })
      );
    } catch (e) {
      yield put(placeOrderActions.failed(e.message));
    }
  } else {
    yield put(placeOrderActions.failed('Token not found'));
  }
}

function* placeOrderSuccess(
  action: AsyncAction<PlaceOrderMeta, PlaceOrderPayload>
) {
  yield put(getSellerOrdersPendingActions.request({ page: '1' }));
  yield put(getSellerOrdersPlacedActions.request({ page: '1' }));
  // yield put(
  //   getSellerOrdersPlacedActions.updateShipOrderOptimisitically(
  //     action.payload.orderId
  //   )
  // );
}

function* placeOrderWatcher() {
  yield takeLatest(placeOrderActions.REQUEST, placeOrderRequest);
  yield takeLatest(placeOrderActions.SUCCESS, placeOrderSuccess);
}

export default placeOrderWatcher;
