import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getSellerLicense } from 'services/company';
import { getSellerLicenseActions } from 'store/actions';
import { AsyncAction } from 'types/Action';
import {
  GetSellerLicenseMeta,
  GetSellerLicensePayload,
} from 'types/store/GetSellerLicenseState';
import { Store } from 'types/store/Store';

export function* getSellerLicensesRequest(
  action: AsyncAction<GetSellerLicenseMeta, GetSellerLicensePayload>
) {
  const state: Store = yield select();

  try {
    if (!state.auth.token) {
      throw new Error('Token not found');
    }

    const { data } = yield call(
      getSellerLicense,
      { ...action.meta },
      state.auth.token
    );

    if (data) {
      yield put(getSellerLicenseActions.success({ ...data }));
    }
  } catch (e) {
    yield put(getSellerLicenseActions.failed('FAILED'));
    console.error(e);
  }
}

function* getSellerLicensesSuccess(
  action: AsyncAction<GetSellerLicenseMeta, GetSellerLicensePayload>
) {}

function* getSellerLicensesWatcher() {
  yield takeLatest(getSellerLicenseActions.REQUEST, getSellerLicensesRequest);
  yield takeLatest(getSellerLicenseActions.SUCCESS, getSellerLicensesSuccess);
  // yield takeLatest(loginActions.FAILED, loginFailed);
}

export default getSellerLicensesWatcher;
