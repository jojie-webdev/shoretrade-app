import { replace } from 'connected-react-router';
import { BUYER_ROUTES } from 'consts';
import omit from 'ramda/es/omit';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { acceptOffer } from 'services/marketRequest';
import { createCardToken } from 'services/stripe';
import { AsyncAction } from 'types/Action';
import { AcceptOffer, NegotiationPayload } from 'types/store/MarketOfferState';
import { Store } from 'types/store/Store';

import { marketRequestAcceptOfferActions } from '../actions';

function* acceptOfferRequest(
  action: AsyncAction<AcceptOffer, NegotiationPayload>
) {
  const state: Store = yield select();

  if (state.auth.token) {
    try {
      if (!action.meta.card) {
        const { data } = yield call(acceptOffer, action.meta, state.auth.token);
        yield put(
          marketRequestAcceptOfferActions.success({
            ...data,
            data: {
              ...data.data,
              marketRequestId: action.meta.marketRequestId,
            },
          })
        );
      } else {
        const { data: cardTokenData } = yield call(
          createCardToken,
          action.meta.card
        );

        const payload = omit(['card'], action.meta);

        const { data } = yield call(
          acceptOffer,
          { cardToken: cardTokenData.id, ...payload },
          state.auth.token
        );
        yield put(
          marketRequestAcceptOfferActions.success({
            ...data,
            data: {
              ...data.data,
              marketRequestId: payload.marketRequestId,
            },
          })
        );
      }
    } catch (e) {
      yield put(marketRequestAcceptOfferActions.failed(e.message));
    }
  } else {
    yield put(marketRequestAcceptOfferActions.failed('Token not found'));
  }
}

function* acceptOfferSuccess(
  action: AsyncAction<AcceptOffer, NegotiationPayload>
) {
  yield put(replace(BUYER_ROUTES.MARKET_REQUESTS));
}

function* acceptOfferWatcher() {
  yield takeLatest(marketRequestAcceptOfferActions.REQUEST, acceptOfferRequest);
  yield takeLatest(marketRequestAcceptOfferActions.SUCCESS, acceptOfferSuccess);
}

export default acceptOfferWatcher;
