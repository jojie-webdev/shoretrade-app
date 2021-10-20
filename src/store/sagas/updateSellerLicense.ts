import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { updateSellerLicense as updateSellerLicenseApi } from 'services/company';
import { uploadImageData } from 'services/upload';
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
      let data;
      if (action.meta.status === 'DELETED') {
        const { data: updateData } = yield call(
          updateSellerLicenseApi,
          {
            id: action.meta.id,
            companyId: action.meta.companyId,
            status: 'DELETED',
          },
          state.auth.token
        );
        data = updateData;
      } else {
        let sellerLicenseUrl = '';
        let sellerLicenseBackUrl = '';

        if (action.meta.sellerLicenseFile) {
          const { data: sellerLicenseFile } = yield call(uploadImageData, {
            file: action.meta.sellerLicenseFile,
            asset: 'company',
          });
          sellerLicenseUrl = sellerLicenseFile.url;
        }
        if (action.meta.sellerLicenseFileBack) {
          const { data: sellerLicenseFileBack } = yield call(uploadImageData, {
            file: action.meta.sellerLicenseFileBack,
            asset: 'company',
          });
          sellerLicenseBackUrl = sellerLicenseFileBack.url;
        }

        let fileType = '';
        const licenseExtension = sellerLicenseUrl.substring(
          sellerLicenseUrl.lastIndexOf('.') + 1,
          sellerLicenseUrl.length
        );

        if (licenseExtension.toLowerCase().includes('doc')) {
          fileType = 'DOC';
        } else if (licenseExtension.toLowerCase().includes('pdf')) {
          fileType = 'PDF';
        } else {
          fileType = 'IMAGE';
        }
        let fileTypeBack;
        const licenseExtensionBack = sellerLicenseBackUrl.substring(
          sellerLicenseBackUrl.lastIndexOf('.') + 1,
          sellerLicenseBackUrl.length
        );
        if (licenseExtensionBack.toLowerCase().includes('doc')) {
          fileTypeBack = 'DOC';
        } else if (licenseExtensionBack.toLowerCase().includes('pdf')) {
          fileTypeBack = 'PDF';
        } else if (sellerLicenseBackUrl.length) {
          fileTypeBack = 'IMAGE';
        }

        const { data: updateData } = yield call(
          updateSellerLicenseApi,
          {
            ...action.meta,
            url: sellerLicenseUrl !== '' ? sellerLicenseUrl : action.meta.url,
            name: action.meta.name,
            fileType,
            fileTypeBack,
            urlBack:
              sellerLicenseBackUrl !== ''
                ? sellerLicenseBackUrl
                : action.meta.urlBack,
            stateId: action.meta.stateId,
            expiredAt: action.meta.expiredAt,
            status: action.meta.status,
          },
          state.auth.token
        );
        data = updateData;
      }

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
  yield put(
    push(
      `${SELLER_ACCOUNT_ROUTES.LICENSES}?companyId=${action.payload.companyId}`
    )
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
