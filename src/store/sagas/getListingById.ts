import { lensPath, pathOr, set, view } from 'ramda';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getListingById } from 'services/listing';
import { AsyncAction, Action } from 'types/Action';
import { GetListingByIdMeta, GetListingByIdPayload } from 'types/store/GetListingByIdState';
import { Store } from 'types/store/Store';
import { findProduct } from 'utils/Listing';

import { getListingByIdActions, socketActions } from '../actions';

function* getListingByIdRequest(
  action: AsyncAction<GetListingByIdMeta, GetListingByIdPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getListingById,
        action.meta,
        state.auth.token
      );

      yield put(getListingByIdActions.success(data));
    } catch (e) {
      yield put(getListingByIdActions.failed(e.message));
    }
  } else {
    yield put(getListingByIdActions.failed('Token not found'));
  }
}

function* getListingByIdWatcher() {
  yield takeLatest(getListingByIdActions.REQUEST, getListingByIdRequest);
}

export default getListingByIdWatcher;
