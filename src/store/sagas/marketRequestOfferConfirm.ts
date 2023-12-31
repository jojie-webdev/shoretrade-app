import { pathOr } from 'ramda';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { offerConfirm } from 'services/marketRequest';
import { AsyncAction } from 'types/Action';
import { GenericResponse } from 'types/GenericResponse';
import { Offer } from 'types/store/GetActiveOffersState';
import { OfferConfirm } from 'types/store/MarketOfferState';
import { Store } from 'types/store/Store';

import { getActiveOffersActions, marketRequestOfferConfirm } from '../actions';

function* confirmOfferRequest(
  action: AsyncAction<OfferConfirm, GenericResponse>
) {
  const state: Store = yield select();

  if (state.auth.token) {
    try {
      if (action.meta.marketOfferId) {
        const { data } = yield call(
          offerConfirm,
          action.meta,
          state.auth.token
        );
        yield put(
          marketRequestOfferConfirm.success({
            ...data,
            data: {
              ...data.data,
              marketOfferId: action.meta.marketOfferId,
            },
          })
        );
      }
    } catch (e) {
      yield put(marketRequestOfferConfirm.failed(e.message));
    }
  } else {
    yield put(marketRequestOfferConfirm.failed('Token not found'));
  }
}

function* confirmOfferSuccess(action: AsyncAction<Offer, GenericResponse>) {
  const marketRequestId = pathOr(
    '',
    ['payload', 'data', 'market_request_id'],
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

function* confirmOfferWatcher() {
  yield takeLatest(marketRequestOfferConfirm.REQUEST, confirmOfferRequest);
  yield takeLatest(marketRequestOfferConfirm.SUCCESS, confirmOfferSuccess);
}

export default confirmOfferWatcher;
