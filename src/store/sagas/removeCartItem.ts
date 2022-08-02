import omit from 'ramda/es/omit';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { removeCartItem } from 'services/cart';
import { AsyncAction } from 'types/Action';
import {
  RemoveCartItemMeta,
  RemoveCartItemPayload,
} from 'types/store/RemoveCartItemState';
import { Store } from 'types/store/Store';

import { removeCartItemActions, getCartActions } from '../actions';
import selectedDeliveryMethodActions from './../actions/selectedDeliveryMethod';

function* removeCartItemRequest(
  action: AsyncAction<RemoveCartItemMeta, RemoveCartItemPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        removeCartItem,
        action.meta,
        state.auth.token
      );
      yield put(removeCartItemActions.success(data));
    } catch (e) {
      yield put(removeCartItemActions.failed(e.message));
    }
  } else {
    yield put(removeCartItemActions.failed('Token not found'));
  }
}

function* removeCartItemSuccess(
  action: AsyncAction<RemoveCartItemMeta, RemoveCartItemPayload>
) {
  const state: Store = yield select();
  const employeeId = state.getCart.request?.employeeId;
  const orderListingKey = state.removeCartItem.request?.orderListingKey || '';
  const { selectedDeliveryMethod } = state;

  if (employeeId) {
    yield put(getCartActions.request({ employeeId }));
  }

  if (employeeId && orderListingKey) {
    const modifiedSelectedDeliveryMethod = omit(
      [orderListingKey],
      selectedDeliveryMethod
    );

    yield put(
      selectedDeliveryMethodActions.update(modifiedSelectedDeliveryMethod)
    );
  }
}

function* removeCartItemWatcher() {
  yield takeLatest(removeCartItemActions.REQUEST, removeCartItemRequest);
  yield takeLatest(removeCartItemActions.SUCCESS, removeCartItemSuccess);
}

export default removeCartItemWatcher;
