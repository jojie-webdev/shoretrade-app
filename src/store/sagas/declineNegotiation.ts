import { put, call, takeLatest, select } from 'redux-saga/effects';
import { declineNegotiation } from 'services/negotiations';
import { AsyncAction } from 'types/Action';
import {
  DeclineNegotiationMeta,
  DeclineNegotiationPayload,
} from 'types/store/DeclineNegotiationState';
import { Store } from 'types/store/Store';

import { declineNegotiationActions } from '../actions';

function* declineNegotiationRequest(
  action: AsyncAction<DeclineNegotiationMeta, DeclineNegotiationPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        declineNegotiation,
        action.meta,
        state.auth.token
      );
      yield put(declineNegotiationActions.success(data));
    } catch (e) {
      yield put(declineNegotiationActions.failed(e.message));
    }
  } else {
    yield put(declineNegotiationActions.failed('Token not found'));
  }
}

function* declineNegotiationWatcher() {
  yield takeLatest(
    declineNegotiationActions.REQUEST,
    declineNegotiationRequest
  );
}

export default declineNegotiationWatcher;
