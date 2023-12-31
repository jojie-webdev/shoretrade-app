import { push } from 'connected-react-router';
import { BUYER_ROUTES } from 'consts';
import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { addCardAndPay } from 'services/payment';
import { createCardToken } from 'services/stripe';
import { AsyncAction } from 'types/Action';
import {
  AddCardAndPayMeta,
  AddCardAndPayPayload,
} from 'types/store/AddCardAndPayState';
import { Store } from 'types/store/Store';

import {
  getPaymentMethodsActions,
  addCardAndPayActions,
  cartActions,
  getUserActions,
} from '../actions';

function* addCardAndPayRequest(
  action: AsyncAction<AddCardAndPayMeta, AddCardAndPayPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      if (action.meta.existingCard) {
        const { data } = yield call(
          addCardAndPay,
          {
            cartId: action.meta.cartId,
            employeeId: action.meta.employeeId,
            companyId: action.meta.companyId,
            existingCard: action.meta.existingCard,
            currency: 'aud',
            email: action.meta.email,
            cart: action.meta.cart,
            currentAddress: action.meta.currentAddress,
            totalPrice: action.meta.totalPrice,
            paymentMode: action.meta.paymentMode,
            negotiationRequestId: action.meta.negotiationRequestId,
          },
          state.auth.token
        );

        yield put(addCardAndPayActions.success(data));
      } else if (action.meta.card) {
        const { data: cardTokenData } = yield call(
          createCardToken,
          action.meta.card
        );
        const { data } = yield call(
          addCardAndPay,
          {
            cartId: action.meta.cartId,
            employeeId: action.meta.employeeId,
            companyId: action.meta.companyId,
            cardToken: cardTokenData.id,
            currency: 'aud',
            email: action.meta.email,
            cart: action.meta.cart,
            currentAddress: action.meta.currentAddress,
            totalPrice: action.meta.totalPrice,
            paymentMode: action.meta.paymentMode,
            negotiationRequestId: action.meta.negotiationRequestId,
            ...(action.meta.default ? { default: true } : {}),
          },
          state.auth.token
        );
        yield put(addCardAndPayActions.success(data));
      }
    } catch (e) {
      console.error(e);
      if (e.message) {
        yield put(addCardAndPayActions.failed(e.message));
      } else if (e?.response?.data) {
        yield put(addCardAndPayActions.failed(e.response.data.error.message));
      }
    }
  } else {
    yield put(addCardAndPayActions.failed('Token not found'));
  }
}

function* addCardAndPaySuccess(
  action: AsyncAction<AddCardAndPayMeta, AddCardAndPayPayload>
) {
  yield put(push(BUYER_ROUTES.ORDERS));
  yield put(cartActions.clear());
  yield put(getUserActions.request());

  const companyId = pathOr('', ['payload', 'data', 'companyId'], action);
  if (companyId) {
    yield put(getPaymentMethodsActions.request({ companyId }));
  }
}

function* addCardAndPayWatcher() {
  yield takeLatest(addCardAndPayActions.REQUEST, addCardAndPayRequest);
  yield takeLatest(addCardAndPayActions.SUCCESS, addCardAndPaySuccess);
}

export default addCardAndPayWatcher;
