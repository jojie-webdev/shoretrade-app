import { put, call, takeLatest, select } from 'redux-saga/effects';
import { createNegotiation } from 'services/listing';
import { AsyncAction } from 'types/Action';
import {
  CreateNegotiationMeta,
  CreateNegotiationPayload,
} from 'types/store/CreateNegotiationState';
import { Store } from 'types/store/Store';

import { createNegotiationActions } from '../actions';

function* createNegotiationRequest(
  action: AsyncAction<CreateNegotiationMeta, CreateNegotiationPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        createNegotiation,
        action.meta,
        state.auth.token
      );
      yield put(createNegotiationActions.success(data));
    } catch (e) {
      yield put(createNegotiationActions.failed(e.message));
    }
  } else {
    yield put(createNegotiationActions.failed('Token not found'));
  }
}

function* createNegotiationWatcher() {
  yield takeLatest(createNegotiationActions.REQUEST, createNegotiationRequest);
}

export default createNegotiationWatcher;
