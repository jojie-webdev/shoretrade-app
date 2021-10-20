import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { addSellerLicense } from 'services/company';
import { uploadImageData } from 'services/upload';
import { AsyncAction } from 'types/Action';
import {
  AddSellerLicenseMeta,
  AddSellerLicensePayload,
} from 'types/store/AddSellerLicenseState';
import { Store } from 'types/store/Store';

import { addSellerLicenseActions, getSellerLicenseActions } from '../actions';

function* addSellerLicenseRequest(
  action: AsyncAction<AddSellerLicenseMeta, AddSellerLicensePayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
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

      const { data } = yield call(
        addSellerLicense,
        {
          ...action.meta,
          sellerLicense: {
            url: sellerLicenseUrl,
            name: action.meta.fileName || '',
            fileType,
            urlBack: sellerLicenseBackUrl,
            fileTypeBack,
            stateId: action.meta.stateId || '',
            expiredAt: action.meta.expiredAt || '',
          },
        },
        state.auth.token
      );

      yield put(
        addSellerLicenseActions.success({
          ...data,
          companyId: action.meta.companyId,
        })
      );
    } catch (e) {
      yield put(addSellerLicenseActions.failed(e.message));
    }
  } else {
    yield put(addSellerLicenseActions.failed('Token not found'));
  }
}

function* addSellerLicenseSuccess(
  action: AsyncAction<AddSellerLicenseMeta, AddSellerLicensePayload>
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

function* addSellerLicenseWatcher() {
  yield takeLatest(addSellerLicenseActions.REQUEST, addSellerLicenseRequest);
  yield takeLatest(addSellerLicenseActions.SUCCESS, addSellerLicenseSuccess);
}

export default addSellerLicenseWatcher;
