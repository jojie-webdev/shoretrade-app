import { put, call, takeLatest, select } from 'redux-saga/effects';
import { createCardToken } from 'services/stripe';
import { payPlan, updatePlan } from 'services/subscription';
import { AsyncAction } from 'types/Action';
import { AddCardTokenMeta } from 'types/store/AddCardTokenState';
import {
  PaySubscriptionMeta,
  PaySubscriptionPayload,
} from 'types/store/PaySubscriptionState';
import { Store } from 'types/store/Store';
import { UpdateSubscriptionPlanMeta } from 'types/store/UpdateSubscriptionPlanState';

import { paySubscriptionActions } from '../actions';

function* paySubscriptionRequest(
  action: AsyncAction<PaySubscriptionMeta, PaySubscriptionPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const newCardDetails = action.meta.cardDetails;
      const param: UpdateSubscriptionPlanMeta = {
        companyId: action.meta.companyId,
        payment: {
          existingCard: '',
        },
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

        param.payment.existingCard = id;
      } else if (action.meta.existingCard) {
        param.payment.existingCard = action.meta.existingCard;
      }

      const { data } = yield call(updatePlan, param, state.auth.token);
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
