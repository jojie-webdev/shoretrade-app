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
          data: { ...data.data, ...action.meta },
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
  const marketRequestId = pathOr(
    '',
    ['payload', 'data', 'marketRequestId'],
    action
  );
  yield put(
    getActiveOffersActions.request({
      queryParams: {
        marketRequestId,
      },
    })
  );
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
