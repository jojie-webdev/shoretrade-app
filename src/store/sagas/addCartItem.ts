import { push } from 'connected-react-router';
import { BUYER_ROUTES } from 'consts';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { addCartItem } from 'services/cart';
import { AsyncAction } from 'types/Action';
import {
  AddCartItemMeta,
  AddCartItemPayload,
} from 'types/store/AddCartItemState';
import { Store } from 'types/store/Store';

import { addCartItemActions, getCartActions } from '../actions';

function* addCartItemRequest(
  action: AsyncAction<AddCartItemMeta, AddCartItemPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(addCartItem, action.meta, state.auth.token);
      yield put(addCartItemActions.success(data));
    } catch (e) {
      yield put(addCartItemActions.failed(e.message));
    }
  } else {
    yield put(addCartItemActions.failed('Token not found'));
  }
}

function* addCartItemSuccess(
  action: AsyncAction<AddCartItemMeta, AddCartItemPayload>
) {
  yield put(push(BUYER_ROUTES.CHECKOUT));
}

function* addCartItemWatcher() {
  yield takeLatest(addCartItemActions.REQUEST, addCartItemRequest);
  yield takeLatest(addCartItemActions.SUCCESS, addCartItemSuccess);
}

export default addCartItemWatcher;
