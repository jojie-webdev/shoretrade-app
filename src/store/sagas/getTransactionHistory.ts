import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getTransactionHistory } from 'services/company';
import { AsyncAction } from 'types/Action';
import {
  GetTransactionHistoryMeta,
  GetTransactionHistoryPayload,
} from 'types/store/GetTransactionHistoryState';
import { Store } from 'types/store/Store';

import { getTransactionHistoryActions } from '../actions';

function* getTransactionHistoryRequest(
  action: AsyncAction<GetTransactionHistoryMeta, GetTransactionHistoryPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getTransactionHistory,
        action.meta,
        state.auth.token
      );
      yield put(getTransactionHistoryActions.success(data));
    } catch (e) {
      yield put(getTransactionHistoryActions.failed(e.message));
    }
  } else {
    yield put(getTransactionHistoryActions.failed('Token not found'));
  }
}

function* getTransactionHistoryWatcher() {
  yield takeLatest(
    getTransactionHistoryActions.REQUEST,
    getTransactionHistoryRequest
  );
}

export default getTransactionHistoryWatcher;
