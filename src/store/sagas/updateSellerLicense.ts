import { put, call, takeLatest, select } from 'redux-saga/effects';
import { updateSellerLicense as updateSellerLicenseApi } from 'services/company';
import { AsyncAction } from 'types/Action';
import { Store } from 'types/store/Store';
import {
  UpdateSellerLicenseMeta,
  UpdateSellerLicensePayload,
} from 'types/store/UpdateSellerLicenseState';

import {
  getSellerLicenseActions,
  updateSellerLicenseActions,
} from '../actions';

function* updateSellerLicense(
  action: AsyncAction<UpdateSellerLicenseMeta, UpdateSellerLicensePayload>
) {
  const state: Store = yield select();

  if (state.auth.token) {
    try {
      const { data } = yield call(
        updateSellerLicenseApi,
        { ...action.meta },
        state.auth.token
      );

      yield put(
        updateSellerLicenseActions.success({
          ...data,
          companyId: action.meta.companyId,
        })
      );
    } catch (e) {
      yield put(updateSellerLicenseActions.failed(e.message));
    }
  } else {
    yield put(updateSellerLicenseActions.failed('Token not found'));
  }
}

function* updateSellerLicenseSuccess(
  action: AsyncAction<UpdateSellerLicenseMeta, UpdateSellerLicensePayload>
) {
  yield put(
    getSellerLicenseActions.request({
      companyId: action.payload.companyId,
    })
  );
}

function* updateSellerLicenseWatcher() {
  yield takeLatest(updateSellerLicenseActions.REQUEST, updateSellerLicense);
  yield takeLatest(
    updateSellerLicenseActions.SUCCESS,
    updateSellerLicenseSuccess
  );
}

export default updateSellerLicenseWatcher;
