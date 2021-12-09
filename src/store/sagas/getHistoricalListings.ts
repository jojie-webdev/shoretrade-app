import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getHistoricalListings } from 'services/listing';
import { AsyncAction } from 'types/Action';
import {
  GetHistoricalListingsMeta,
  GetHistoricalListingsPayload,
} from 'types/store/GetHistoricalListingsState';
import { Store } from 'types/store/Store';

import { getHistoricalListingsActions } from '../actions';

function* getHistoricalListingsRequest(
  action: AsyncAction<GetHistoricalListingsMeta, GetHistoricalListingsPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getHistoricalListings,
        action.meta,
        state.auth.token
      );
      yield put(getHistoricalListingsActions.success(data));
    } catch (e) {
      yield put(getHistoricalListingsActions.failed(e.message));
    }
  } else {
    yield put(getHistoricalListingsActions.failed('Token not found'));
  }
}

function* getHistoricalListingsWatcher() {
  yield takeLatest(
    getHistoricalListingsActions.REQUEST,
    getHistoricalListingsRequest
  );
}

export default getHistoricalListingsWatcher;
