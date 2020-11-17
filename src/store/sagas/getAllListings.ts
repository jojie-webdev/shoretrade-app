import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getAllListings } from 'services/listing';
import { AsyncAction } from 'types/Action';
import {
  GetAllListingsMeta,
  GetAllListingsPayload,
} from 'types/store/GetAllListingsState';
import { Store } from 'types/store/Store';

import { getAllListingsActions } from '../actions';

function* getAllListingsRequest(
  action: AsyncAction<GetAllListingsMeta, GetAllListingsPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(getAllListings, state.auth.token);
      yield put(getAllListingsActions.success(data));
    } catch (e) {
      yield put(getAllListingsActions.failed(e.message));
    }
  } else {
    yield put(getAllListingsActions.failed('Token not found'));
  }
}

function* getAllListingsWatcher() {
  yield takeLatest(getAllListingsActions.REQUEST, getAllListingsRequest);
}

export default getAllListingsWatcher;
