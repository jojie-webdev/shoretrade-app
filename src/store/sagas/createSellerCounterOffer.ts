import { put, call, takeLatest, select } from 'redux-saga/effects';
import { createSellerCounterOffer } from 'services/negotiations';
import { AsyncAction } from 'types/Action';
import {
  CreateSellerCounterOfferMeta,
  CreateSellerCounterOfferPayload,
} from 'types/store/CreateSellerCounterOfferState';
import { Store } from 'types/store/Store';

import { createSellerCounterOfferActions } from '../actions';

function* createSellerCounterOfferRequest(
  action: AsyncAction<
    CreateSellerCounterOfferMeta,
    CreateSellerCounterOfferPayload
  >
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        createSellerCounterOffer,
        action.meta,
        state.auth.token
      );
      yield put(createSellerCounterOfferActions.success(data));
    } catch (e) {
      yield put(createSellerCounterOfferActions.failed(e.message));
    }
  } else {
    yield put(createSellerCounterOfferActions.failed('Token not found'));
  }
}

function* createSellerCounterOfferWatcher() {
  yield takeLatest(
    createSellerCounterOfferActions.REQUEST,
    createSellerCounterOfferRequest
  );
}

export default createSellerCounterOfferWatcher;
