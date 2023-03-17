import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getAllNegotiations } from 'services/negotiations';
import { AsyncAction } from 'types/Action';
import {
  GetAllNegotiationsMeta,
  GetAllNegotiationsPayload,
} from 'types/store/GetAllNegotiationsState';
import { Store } from 'types/store/Store';

import { getAllNegotiationsActions } from '../actions';

function* getAllNegotiationsRequest(
  action: AsyncAction<GetAllNegotiationsMeta, GetAllNegotiationsPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getAllNegotiations,
        action.meta,
        state.auth.token
      );
      yield put(getAllNegotiationsActions.success(data));
    } catch (e) {
      yield put(getAllNegotiationsActions.failed(e.message));
    }
  } else {
    yield put(getAllNegotiationsActions.failed('Token not found'));
  }
}

function* getAllNegotiationsWatcher() {
  yield takeLatest(
    getAllNegotiationsActions.REQUEST,
    getAllNegotiationsRequest
  );
}

export default getAllNegotiationsWatcher;
