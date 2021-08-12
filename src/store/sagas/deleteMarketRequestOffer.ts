import { replace } from 'connected-react-router';
import { BUYER_ROUTES } from 'consts';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { deleteOffer } from 'services/marketRequest';
import { AsyncAction } from 'types/Action';
import {
  DeleteMarketRequestOfferMeta,
  DeleteMarketRequestOfferPayload,
} from 'types/store/DeleteMarketRequestOfferState';
import { Store } from 'types/store/Store';
import { deleteMarketRequestOfferActions } from '../actions';

function* deleteMarketRequestOfferRequest(
  action: AsyncAction<DeleteMarketRequestOfferMeta, DeleteMarketRequestOfferPayload>
) {
  const state: Store = yield select();

  if (state.auth.token) {
    try {
      const { data } = yield call(deleteOffer, action.meta, state.auth.token);
      yield put(deleteMarketRequestOfferActions.success(data));
    } catch (e) {
      yield put(deleteMarketRequestOfferActions.failed(e.message));
    }
  } else {
    yield put(deleteMarketRequestOfferActions.failed('Token not found'));
  }
}

function* deleteMarketRequestOfferSuccess(
  action: AsyncAction<DeleteMarketRequestOfferMeta, DeleteMarketRequestOfferPayload>
) {
  // yield put(replace(BUYER_ROUTES.MARKET_REQUEST_DETAILS_OFFER_LIST()));
}

function* deleteMarketRequestOfferWatcher() {
  yield takeLatest(
    deleteMarketRequestOfferActions.REQUEST,
    deleteMarketRequestOfferRequest
  );
  yield takeLatest(
    deleteMarketRequestOfferActions.SUCCESS,
    deleteMarketRequestOfferSuccess
  );
}

export default deleteMarketRequestOfferWatcher;
