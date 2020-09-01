import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getUser } from 'services/auth';
import { AsyncAction } from 'types/Action';
import {
  GetUserMeta,
  GetUserPayload,
  UserCompany,
} from 'types/store/GetUserState';
import { Store } from 'types/store/Store';

import { getUserActions, authActions, getAddressesActions } from '../actions';

function* getUserRequest(action: AsyncAction<GetUserMeta, GetUserPayload>) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(getUser, state.auth.token);
      yield put(getUserActions.success(data));
    } catch (e) {
      yield put(getUserActions.failed(e.message));
    }
  } else {
    yield put(getUserActions.failed('Token not found'));
  }
}

function* getUserSuccess(action: AsyncAction<GetUserMeta, GetUserPayload>) {
  // TODO: if buyer set to true
  const state: Store = yield select();
  if (state.auth.type === 'buyer') {
    if ((state.getAddresses.data?.data.addresses || []).length === 0) {
      const { companies } = action.payload.data.user;
      const companyId: string = pathOr('', ['0', 'id'], companies);
      if (companyId) {
        yield put(getAddressesActions.request({ companyId }));
      }
    }
  }
}

function* getUserFailed(action: AsyncAction<GetUserMeta, GetUserPayload>) {
  if (action.error === 'Request failed with status code 401') {
    yield put(authActions.clear());
  }
}

function* getUserWatcher() {
  yield takeLatest(getUserActions.REQUEST, getUserRequest);
  yield takeLatest(getUserActions.SUCCESS, getUserSuccess);
  yield takeLatest(getUserActions.FAILED, getUserFailed);
}

export default getUserWatcher;
