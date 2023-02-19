import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { createNegotiation } from 'services/createNegotiation';
import { AsyncAction } from 'types/Action';
import {
  CreateNegotiation_2Meta,
  CreateNegotiation_2Payload,
} from 'types/store/CreateNegotiation_2State';
import { Store } from 'types/store/Store';

import { createNegotiation_2Actions } from '../actions';

function* createNegotiation_2Request(
  action: AsyncAction<CreateNegotiation_2Meta, CreateNegotiation_2Payload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        createNegotiation,
        action.meta,
        state.auth.token
      );
      yield put(createNegotiation_2Actions.success(data));
    } catch (e) {
      yield put(createNegotiation_2Actions.failed(e.message));
    }
  } else {
    yield put(createNegotiation_2Actions.failed('Token not found'));
  }
}

function* createNegotiation_2Watcher() {
  yield takeLatest(
    createNegotiation_2Actions.REQUEST,
    createNegotiation_2Request
  );
}

export default createNegotiation_2Watcher;
