import { replace } from 'connected-react-router';
import { BUYER_ROUTES } from 'consts';
import qs from 'qs';
import { pathOr } from 'ramda';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { negotiateOffer } from 'services/marketRequest';
import { AsyncAction } from 'types/Action';
import {
  NegotiateOffer,
  NegotiationPayload,
} from 'types/store/MarketOfferState';
import { Store } from 'types/store/Store';

import {
  getActiveOffersActions,
  marketRequestNegotiationOfferActions,
} from '../actions';

function* negotiationOfferRequest(
  action: AsyncAction<NegotiateOffer, NegotiationPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        negotiateOffer,
        action.meta,
        state.auth.token
      );
      yield put(
        marketRequestNegotiationOfferActions.success({
          ...data,
          data: { ...data.data, marketRequestId: action.meta.marketRequestId },
        })
      );
    } catch (e) {
      yield put(marketRequestNegotiationOfferActions.failed(e.message));
    }
  } else {
    yield put(marketRequestNegotiationOfferActions.failed('Token not found'));
  }
}

function* negotiationOfferSuccess(
  action: AsyncAction<NegotiateOffer, NegotiationPayload>
) {
  yield put(replace(BUYER_ROUTES.MARKET_REQUESTS));
}

function* negotiationOfferWatcher() {
  yield takeLatest(
    marketRequestNegotiationOfferActions.REQUEST,
    negotiationOfferRequest
  );
  yield takeLatest(
    marketRequestNegotiationOfferActions.SUCCESS,
    negotiationOfferSuccess
  );
}

export default negotiationOfferWatcher;
