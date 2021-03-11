import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getActiveOffers } from 'services/marketRequest';
import { AsyncAction } from 'types/Action';
import {
  GetActiveOffersMeta,
  GetActiveOffersPayload,
} from 'types/store/GetActiveOffersState';
import { Store } from 'types/store/Store';

import { getActiveOffersActions } from '../actions';

function* getActiveOffersRequest(
  action: AsyncAction<GetActiveOffersMeta, GetActiveOffersPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(getActiveOffers, state.auth.token);
      yield put(getActiveOffersActions.success(data));
    } catch (e) {
      yield put(getActiveOffersActions.failed(e.message));
    }
  } else {
    yield put(getActiveOffersActions.failed('Token not found'));
  }
}

function* getActiveOffersWatcher() {
  yield takeLatest(getActiveOffersActions.REQUEST, getActiveOffersRequest);
}

export default getActiveOffersWatcher;
