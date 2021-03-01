import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getAccountCompletion } from 'services/company';
import { AsyncAction } from 'types/Action';
import {
  GetAccountCompletionMeta,
  GetAccountCompletionPayload,
} from 'types/store/GetAccountCompletionState';
import { Store } from 'types/store/Store';

import { getAccountCompletionActions } from '../actions';

function* getAccountCompletionRequest(
  action: AsyncAction<GetAccountCompletionMeta, GetAccountCompletionPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getAccountCompletion,
        action.meta,
        state.auth.token
      );
      yield put(getAccountCompletionActions.success(data));
    } catch (e) {
      yield put(getAccountCompletionActions.failed(e.message));
    }
  } else {
    yield put(getAccountCompletionActions.failed('Token not found'));
  }
}

function* getAccountCompletionSuccess(
  action: AsyncAction<GetAccountCompletionMeta, GetAccountCompletionPayload>
) {
  // ON SUCCESS
}

function* getAccountCompletionWatcher() {
  yield takeLatest(
    getAccountCompletionActions.REQUEST,
    getAccountCompletionRequest
  );

  yield takeLatest(
    getAccountCompletionActions.SUCCESS,
    getAccountCompletionSuccess
  );
}

export default getAccountCompletionWatcher;
