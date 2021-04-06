import { replace } from 'connected-react-router';
import { BUYER_ROUTES } from 'consts';
import qs from 'qs';
import { pathOr } from 'ramda';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { acceptOffer } from 'services/marketRequest';
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
      const { data } = yield call(acceptOffer, action.meta, state.auth.token);
      yield put(
        marketRequestAcceptOfferActions.success({
          ...data,
          data: { ...data.data, marketRequestId: action.meta.marketRequestId },
        })
      );
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
