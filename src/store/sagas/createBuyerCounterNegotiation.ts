import { put, call, takeLatest, select } from 'redux-saga/effects';
import { createBuyerCounterNegotiation } from 'services/negotiations';
import { AsyncAction } from 'types/Action';
import {
  CreateBuyerCounterNegotiationMeta,
  CreateBuyerCounterNegotiationPayload,
} from 'types/store/CreateBuyerCounterNegotiationState';
import { Store } from 'types/store/Store';

import { createBuyerCounterNegotiationActions } from '../actions';

function* createBuyerCounterNegotiationRequest(
  action: AsyncAction<
    CreateBuyerCounterNegotiationMeta,
    CreateBuyerCounterNegotiationPayload
  >
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        createBuyerCounterNegotiation,
        action.meta,
        state.auth.token
      );
      yield put(createBuyerCounterNegotiationActions.success(data));
    } catch (e) {
      yield put(createBuyerCounterNegotiationActions.failed(e.message));
    }
  } else {
    yield put(createBuyerCounterNegotiationActions.failed('Token not found'));
  }
}

function* createBuyerCounterNegotiationWatcher() {
  yield takeLatest(
    createBuyerCounterNegotiationActions.REQUEST,
    createBuyerCounterNegotiationRequest
  );
}

export default createBuyerCounterNegotiationWatcher;
