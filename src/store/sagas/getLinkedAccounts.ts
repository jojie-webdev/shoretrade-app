import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getLinkedAccounts } from 'services/company';
import { AsyncAction } from 'types/Action';
import {
  GetLinkedAccountsMeta,
  GetLinkedAccountsPayload,
} from 'types/store/GetLinkedAccountsState';
import { Store } from 'types/store/Store';

import { getLinkedAccountsActions } from '../actions';

function* getLinkedAccountsRequest(
  action: AsyncAction<GetLinkedAccountsMeta, GetLinkedAccountsPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getLinkedAccounts,
        action.meta,
        state.auth.token
      );
      yield put(getLinkedAccountsActions.success(data));
    } catch (e) {
      yield put(getLinkedAccountsActions.failed(e.message));
    }
  } else {
    yield put(getLinkedAccountsActions.failed('Token not found'));
  }
}

function* getLinkedAccountsWatcher() {
  yield takeLatest(getLinkedAccountsActions.REQUEST, getLinkedAccountsRequest);
}

export default getLinkedAccountsWatcher;
