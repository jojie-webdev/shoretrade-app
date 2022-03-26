import { put, call, takeLatest, select } from 'redux-saga/effects';
import { createCardToken } from 'services/stripe';
import { payPlan } from 'services/subscription';
import { AsyncAction } from 'types/Action';
import { AddCardTokenMeta } from 'types/store/AddCardTokenState';
import {
  PaySubscriptionMeta,
  PaySubscriptionPayload,
} from 'types/store/PaySubscriptionState';
import { Store } from 'types/store/Store';

import { paySubscriptionActions } from '../actions';

function* paySubscriptionRequest(
  action: AsyncAction<PaySubscriptionMeta, PaySubscriptionPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const newCardDetails = action.meta.cardDetails;
      const param: {
        companyId: string;
        existingCard?: string;
        cardToken?: string;
        isDefault?: boolean;
      } = {
        companyId: action.meta.companyId,
      };

      if (!action.meta.existingCard && newCardDetails) {
        const {
          data: { id },
        } = yield call(createCardToken, {
          number: parseInt(newCardDetails.cardNumber.replace(/\s/g, '')),
          exp_month: parseInt(newCardDetails.cardExpiryDate.split('/')[0]),
          exp_year: parseInt(newCardDetails.cardExpiryDate.split('/')[1]),
          cvc: parseInt(newCardDetails.cardCvc),
          name: newCardDetails.cardName,
        });

        param.cardToken = id;
        param.isDefault = newCardDetails.isDefault;
      } else {
        param.existingCard = action.meta.existingCard;
      }

      const { data } = yield call(payPlan, param, state.auth.token);
      yield put(paySubscriptionActions.success(data));
    } catch (e) {
      yield put(paySubscriptionActions.failed(e.message));
    }
  } else {
    yield put(paySubscriptionActions.failed('Token not found'));
  }
}

function* paySubscriptionWatcher() {
  yield takeLatest(paySubscriptionActions.REQUEST, paySubscriptionRequest);
}

export default paySubscriptionWatcher;
