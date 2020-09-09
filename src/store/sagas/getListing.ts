import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getListing } from 'services/listing';
import { AsyncAction } from 'types/Action';
import { GetListingMeta, GetListingPayload } from 'types/store/GetListingState';
import { Store } from 'types/store/Store';

import { getListingActions } from '../actions';

function* getListingRequest(
  action: AsyncAction<GetListingMeta, GetListingPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(getListing, action.meta, state.auth.token);
      yield put(getListingActions.success(data));
    } catch (e) {
      yield put(getListingActions.failed(e.message));
    }
  } else {
    yield put(getListingActions.failed('Token not found'));
  }
}

function* getListingWatcher() {
  yield takeLatest(getListingActions.REQUEST, getListingRequest);
}

export default getListingWatcher;
