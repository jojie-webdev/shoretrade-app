import { put, call, takeLatest, select } from 'redux-saga/effects';
import { acceptNegotiation } from 'services/negotiations';
import { AsyncAction } from 'types/Action';
import {
  AcceptNegotiationMeta,
  AcceptNegotiationPayload,
} from 'types/store/AcceptNegotiationState';
import { Store } from 'types/store/Store';

import { acceptNegotiationActions } from '../actions';

function* acceptNegotiationRequest(
  action: AsyncAction<AcceptNegotiationMeta, AcceptNegotiationPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        acceptNegotiation,
        action.meta,
        state.auth.token
      );
      yield put(acceptNegotiationActions.success(data));
    } catch (e) {
      yield put(acceptNegotiationActions.failed(e.message));
    }
  } else {
    yield put(acceptNegotiationActions.failed('Token not found'));
  }
}

function* acceptNegotiationWatcher() {
  yield takeLatest(acceptNegotiationActions.REQUEST, acceptNegotiationRequest);
}

export default acceptNegotiationWatcher;
