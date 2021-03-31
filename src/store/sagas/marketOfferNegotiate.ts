import { replace } from 'connected-react-router';
import { SELLER_MARKET_BOARD_ROUTES, SELLER_ROUTES } from 'consts/routes';
import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { negotiateOffer } from 'services/marketRequest';
import { AsyncAction } from 'types/Action';
import {
  NegotiateOfferMeta,
  NegotiatePayload,
} from 'types/store/GetActiveOffersState';
import { Store } from 'types/store/Store';

import { marketOfferNegotiateActions } from '../actions';

function* negotiationOfferRequest(
  action: AsyncAction<NegotiateOfferMeta, NegotiatePayload>
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
        marketOfferNegotiateActions.success({ ...data, data: action.meta })
      );
    } catch (e) {
      yield put(marketOfferNegotiateActions.failed(e.message));
    }
  } else {
    yield put(marketOfferNegotiateActions.failed('Token not found'));
  }
}

function* negotiationOfferSuccess(
  action: AsyncAction<NegotiateOfferMeta, NegotiatePayload>
) {
  const accepted = pathOr(false, ['payload', 'data', 'accepted'], action);

  if (accepted) {
    yield put(replace(SELLER_ROUTES.SOLD));
  } else {
    yield put(
      replace(SELLER_MARKET_BOARD_ROUTES.LANDING, {
        currentTab: 'My Active Offers',
      })
    );
  }
}

function* negotiationOfferWatcher() {
  yield takeLatest(
    marketOfferNegotiateActions.REQUEST,
    negotiationOfferRequest
  );
  yield takeLatest(
    marketOfferNegotiateActions.SUCCESS,
    negotiationOfferSuccess
  );
}

export default negotiationOfferWatcher;