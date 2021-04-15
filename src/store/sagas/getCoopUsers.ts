import { ADD_PRODUCT_ROUTES, SELLER_ROUTES } from 'consts';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getCoopUsers } from 'services/company';
import { AsyncAction } from 'types/Action';
import {
  GetCoopUsersMeta,
  GetCoopUsersPayload,
} from 'types/store/GetCoopUsersState';
import { GetUserMeta, GetUserPayload } from 'types/store/GetUserState';
import { Store } from 'types/store/Store';

import { getCoopUsersActions, getUserActions } from '../actions';

function* getCoopUsersRequest(
  action: AsyncAction<GetCoopUsersMeta, GetCoopUsersPayload>
) {
  const state: Store = yield select();
  if (state.auth.token && state.getUser.data?.data.user.id) {
    try {
      const { data } = yield call(
        getCoopUsers,
        { userId: state.getUser.data?.data.user.id || '' },
        state.auth.token
      );
      yield put(getCoopUsersActions.success(data));
    } catch (e) {
      yield put(getCoopUsersActions.failed(e.message));
    }
  } else {
    yield put(getCoopUsersActions.failed('Token/User not found'));
  }
}

function* getUserSuccess(action: AsyncAction<GetUserMeta, GetUserPayload>) {
  const state: Store = yield select();
  if (
    state.router.location.pathname === SELLER_ROUTES.ADD_PRODUCT ||
    state.router.location.pathname === ADD_PRODUCT_ROUTES.BULK_UPLOAD_PREVIEW
  ) {
    yield put(getCoopUsersActions.request());
  }
}

function* getCoopUsersWatcher() {
  yield takeLatest(getCoopUsersActions.REQUEST, getCoopUsersRequest);

  yield takeLatest(getUserActions.SUCCESS, getUserSuccess);
}

export default getCoopUsersWatcher;
