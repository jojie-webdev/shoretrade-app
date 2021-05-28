import { push } from 'connected-react-router';
import { BUYER_ROUTES } from 'consts';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { order } from 'services/orders';
import { AsyncAction } from 'types/Action';
import { OrderMeta, OrderPayload } from 'types/store/OrderState';
import { Store } from 'types/store/Store';

import {
  orderActions,
  cartActions,
  getUserActions,
  getBuyerHomepageActions,
} from '../actions';

function* orderRequest(action: AsyncAction<OrderMeta, OrderPayload>) {
  const state: Store = yield select();

  if (state.auth.token) {
    try {
      const { data } = yield call(order, action.meta, state.auth.token);

      yield put(orderActions.success(data));
    } catch (e) {
      yield put(orderActions.failed(e.message));
    }
  } else {
    yield put(orderActions.failed('Token not found'));
  }
}

function* orderSuccess(action: AsyncAction<OrderMeta, OrderPayload>) {
  yield put(push(BUYER_ROUTES.ORDERS));
  yield put(cartActions.clear());
  yield put(getUserActions.request());
  yield put(getBuyerHomepageActions.request());
}

function* orderWatcher() {
  yield takeLatest(orderActions.REQUEST, orderRequest);

  yield takeLatest(orderActions.SUCCESS, orderSuccess);
}

export default orderWatcher;
