import { push } from 'connected-react-router';
import { BUYER_ROUTES } from 'consts';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { Action } from 'types/Action';
import { GlobalModalState } from 'types/store/GlobalModalState';
import { Store } from 'types/store/Store';

import { globalModalActions, getCartActions, socketActions } from '../actions';

function* globalModalRunner(action: Action<any>) {
  if (action.type === socketActions.CART_EXPIRY_WARNING) {
    const state: Store = yield select();
    const cartItems = state.getCart.data?.data?.items || {};
    const companies = state.getUser.data?.data.user.companies || [];

    const defaultCompany =
      companies.find((company) => company.relationship === 'ADMIN') ||
      // Fallback if company have no admin relationship
      companies.find(
        (company) =>
          company.relationship === 'ASSISTANT' ||
          company.relationship === 'SECONDARY'
      );

    if (defaultCompany && Object.keys(cartItems).length > 0) {
      yield put(
        globalModalActions.set({
          type: 'CART_EXPIRY_WARNING',
        })
      );
    }
  }
}

function* globalModalWatcher() {
  yield takeLatest(socketActions.CART_EXPIRY_WARNING, globalModalRunner);
}

export default globalModalWatcher;
