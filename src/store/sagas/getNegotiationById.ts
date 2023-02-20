import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getNegotiationById } from 'services/negotiations';
import { AsyncAction } from 'types/Action';
import {
  GetNegotiationByIdMeta,
  GetNegotiationByIdPayload,
} from 'types/store/GetNegotiationByIdState';
import { Store } from 'types/store/Store';

import { getNegotiationByIdActions } from '../actions';

function* getNegotiationByIdRequest(
  action: AsyncAction<GetNegotiationByIdMeta, GetNegotiationByIdPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getNegotiationById,
        action.meta,
        state.auth.token
      );
      yield put(getNegotiationByIdActions.success(data));
    } catch (e) {
      yield put(getNegotiationByIdActions.failed(e.message));
    }
  } else {
    yield put(getNegotiationByIdActions.failed('Token not found'));
  }
}

function* getNegotiationByIdWatcher() {
  yield takeLatest(
    getNegotiationByIdActions.REQUEST,
    getNegotiationByIdRequest
  );
}

export default getNegotiationByIdWatcher;
