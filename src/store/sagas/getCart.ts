import cartExpiry from 'consts/cartExpiry';
import moment from 'moment';
import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select, delay } from 'redux-saga/effects';
import { getCart } from 'services/cart';
import { AsyncAction, Action } from 'types/Action';
import { GetCartMeta, GetCartPayload } from 'types/store/GetCartState';
import { Store } from 'types/store/Store';

import { getCartActions, socketActions, globalModalActions } from '../actions';

function* getCartRequest(action: AsyncAction<GetCartMeta, GetCartPayload>) {
  const state: Store = yield select();

  const globalModal = state.globalModal.type;
  if (globalModal === 'CART_EXPIRY_WARNING') {
    yield put(globalModalActions.clear());
  }

  if (state.auth.token) {
    try {
      const { data }: { data: GetCartPayload } = yield call(
        getCart,
        action.meta,
        state.auth.token
      );
      yield put(getCartActions.success(data));
      if (data.data) {
        const millisBeforeCartExpiry = moment(data.data.lastModified)
          .add(cartExpiry.minutesBeforeExpiry, 'minutes')
          .diff(moment(), 'milliseconds');
        yield delay(millisBeforeCartExpiry > 0 ? millisBeforeCartExpiry : 0);
        yield put(getCartActions.request(action.meta));
      }
    } catch (e) {
      yield put(getCartActions.failed(e.message));
    }
  } else {
    yield put(getCartActions.failed('Token not found'));
  }
}

function* getCartPatchItemAdded(action: Action<any>) {
  const state: Store = yield select();
  const payload: {
    employeeId: string;
    transactionRef: string;
  } = pathOr({ employeeId: '', transactionRef: '' }, ['payload'], action);

  const isValidPayload = payload.employeeId && payload.transactionRef;
  const isSameCart = state.getCart.request?.employeeId === payload.employeeId;
  const isNotCaller =
    state.addCartItem.data?.data.transactionRef !== payload.transactionRef;
  if (isValidPayload && isSameCart && isNotCaller) {
    yield put(
      getCartActions.request({
        employeeId: payload.employeeId,
      })
    );
  }
}

function* getCartPatchItemRemoved(action: Action<any>) {
  const state: Store = yield select();
  const payload: {
    employeeId: string;
    transactionRef: string;
  } = pathOr({ employeeId: '', transactionRef: '' }, ['payload'], action);

  const isValidPayload = payload.employeeId && payload.transactionRef;
  const isSameCart = state.getCart.request?.employeeId === payload.employeeId;
  const isNotCaller =
    state.removeCartItem.request?.transactionRef !== payload.transactionRef;
  if (isValidPayload && isSameCart && isNotCaller) {
    yield put(
      getCartActions.request({
        employeeId: payload.employeeId,
      })
    );
  }
}

function* getCartPatchStatusUpdate(action: Action<any>) {
  const payload: {
    employeeId: string;
  } = pathOr({ employeeId: '' }, ['payload'], action);
  yield put(
    getCartActions.request({
      employeeId: payload.employeeId,
    })
  );
}

function* getCartWatcher() {
  yield takeLatest(getCartActions.REQUEST, getCartRequest);
  yield takeLatest(socketActions.CART_ITEM_ADDED, getCartPatchItemAdded);
  yield takeLatest(socketActions.CART_ITEM_REMOVED, getCartPatchItemRemoved);
  yield takeLatest(
    socketActions.CART_EXPIRY_EXTENDED,
    getCartPatchStatusUpdate
  );
  yield takeLatest(socketActions.CART_CLOSED, getCartPatchStatusUpdate);
}

export default getCartWatcher;
