import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { addCartNegotiatedItem } from 'services/cart';
import { AsyncAction } from 'types/Action';
import {
  AddCartNegotiatedItemMeta,
  AddCartNegotiatedItemPayload,
} from 'types/store/AddCartNegotiatedItemState';
import { Store } from 'types/store/Store';

import { addCartNegotiatedItemActions } from '../actions';

function* addCartNegotiatedItemRequest(
  action: AsyncAction<AddCartNegotiatedItemMeta, AddCartNegotiatedItemPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        addCartNegotiatedItem,
        action.meta,
        state.auth.token
      );
      yield put(addCartNegotiatedItemActions.success(data));
    } catch (e) {
      yield put(addCartNegotiatedItemActions.failed(e.message));
    }
  } else {
    yield put(addCartNegotiatedItemActions.failed('Token not found'));
  }
}

function* addCartNegotiatedItemWatcher() {
  yield takeLatest(
    addCartNegotiatedItemActions.REQUEST,
    addCartNegotiatedItemRequest
  );
}

export default addCartNegotiatedItemWatcher;
