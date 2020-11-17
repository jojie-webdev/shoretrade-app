import { put, call, takeLatest, select } from 'redux-saga/effects';
import { sendMessage } from 'services/orders';
import { AsyncAction } from 'types/Action';
import {
  SendMessageMeta,
  SendMessagePayload,
} from 'types/store/SendMessageState';
import { Store } from 'types/store/Store';

import { sendMessageActions, getUserActions } from '../actions';

function* sendMessageRequest(
  action: AsyncAction<SendMessageMeta, SendMessagePayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(sendMessage, action.meta, state.auth.token);
      yield put(sendMessageActions.success(data));
    } catch (e) {
      yield put(sendMessageActions.failed(e.message));
    }
  } else {
    yield put(sendMessageActions.failed('Token not found'));
  }
}

function* sendMessageWatcher() {
  yield takeLatest(sendMessageActions.REQUEST, sendMessageRequest);
}

export default sendMessageWatcher;
