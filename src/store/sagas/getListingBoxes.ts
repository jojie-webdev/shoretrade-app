import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getListingBoxes } from 'services/listing';
import { AsyncAction } from 'types/Action';
import {
  GetListingBoxesMeta,
  GetListingBoxesPayload,
} from 'types/store/GetListingBoxesState';
import { Store } from 'types/store/Store';

import { getListingBoxesActions } from '../actions';

function* getListingBoxesRequest(
  action: AsyncAction<GetListingBoxesMeta, GetListingBoxesPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getListingBoxes,
        action.meta,
        state.auth.token
      );
      yield put(getListingBoxesActions.success(data));
    } catch (e) {
      yield put(getListingBoxesActions.failed(e.message));
    }
  } else {
    yield put(getListingBoxesActions.failed('Token not found'));
  }
}

function* getListingBoxesWatcher() {
  yield takeLatest(getListingBoxesActions.REQUEST, getListingBoxesRequest);
}

export default getListingBoxesWatcher;
