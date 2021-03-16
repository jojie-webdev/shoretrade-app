import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, all, CallEffect } from 'redux-saga/effects';
import { register } from 'services/auth';
import { uploadImageData } from 'services/upload';
import { AsyncAction } from 'types/Action';
import {
  RegisterMeta,
  RegisterPayload,
  RegisterRequestData,
} from 'types/store/RegisterState';

import { registerActions, authActions } from '../actions';

function* registerRequest(action: AsyncAction<RegisterMeta, RegisterPayload>) {
  try {
    let profileImageUrl = '';
    if (action.meta.businessLogo) {
      const { status: uploadStatus, data: profileImage } = yield call(
        uploadImageData,
        {
          file: action.meta.businessLogo,
          asset: 'company',
        }
      );
      profileImageUrl = uploadStatus === 200 ? profileImage.url : '';
    }

    let sellerLicenses: {
      url: string;
      fileType: 'IMAGE' | 'PDF' | 'DOC';
      name: string;
    }[] = [];

    if (action.meta.licenses && action.meta.licenses?.length > 0) {
      const promisesArray: CallEffect<{
        status: number;
        data: {
          url: string;
        };
      }>[] = [];

      action.meta.licenses?.forEach((license) => {
        promisesArray.push(
          call(uploadImageData, {
            file: license.file,
            asset: 'company',
          })
        );
      });

      const dataArr: {
        status: number;
        data: {
          url: string;
        };
      }[] = yield all(promisesArray);

      sellerLicenses = dataArr.map(({ data }, ndx) => {
        let fileType: 'IMAGE' | 'PDF' | 'DOC' = 'IMAGE';
        const licenseExtension = data.url.substring(
          data.url.lastIndexOf('.') + 1,
          data.url.length
        );

        if (licenseExtension.toLowerCase().includes('doc')) {
          fileType = 'DOC';
        } else if (licenseExtension.toLowerCase().includes('pdf')) {
          fileType = 'PDF';
        }

        return {
          fileType: fileType,
          url: data.url,
          name: action.meta.licenses![ndx].fileName,
        };
      });
    }

    const transformMetaToRequest = (
      data: RegisterMeta
    ): RegisterRequestData => {
      if (data.userGroup === 'seller') {
        return {
          email: data.email,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          mobile: data.mobile,
          company: {
            name: data.company.businessName,
            abn: data.company.abn,
          },
          profileImage: profileImageUrl,
          addresses: [data.address],
          bankAccounts: data.bankAccounts || {},
          debtFinancingSegment: data.debtFinancingSegment || '',
          debtFinancingEstRevenue: 0,
          registerDebtFinancing: false,
          marketSector: data.marketSector,
          marketSelling: data.marketSelling,
          sellerLicenses,
        };
      }
      // buyer
      return {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        mobile: data.mobile,
        company: {
          name: data.company.businessName,
          abn: data.company.abn,
        },
        profileImage: '',
        addresses: [data.address],
        bankAccounts: {},
        debtFinancingSegment: data.debtFinancingSegment || '',
        debtFinancingEstRevenue: Number(data.debtFinancingEstRevenue || 0),
        registerDebtFinancing: data.registerDebtFinancing || false,
        marketSector: data.marketSector,
        marketBuying: data.marketBuying,
      };
    };

    const { data } = yield call(
      register,
      action.meta.userGroup,
      transformMetaToRequest(action.meta)
    );

    yield put(registerActions.success(data));

    yield put(registerActions.success(data));
  } catch (e) {
    yield put(registerActions.failed(e.message));
  }
}

function* registerSuccess(action: AsyncAction<RegisterMeta, RegisterPayload>) {
  const userGroup = pathOr<string>(
    '',
    ['payload', 'data', 'user', 'userGroup'],
    action
  );
  if (userGroup === 'BUYER_ADMIN') {
    yield put(
      authActions.update({ token: action.payload.data.token, type: 'buyer' })
    );
  }
}

// function* registerFailed(action: AsyncAction<RegisterMeta, RegisterPayload>) {}

function* registerWatcher() {
  yield takeLatest(registerActions.REQUEST, registerRequest);
  yield takeLatest(registerActions.SUCCESS, registerSuccess);
  // yield takeLatest(registerActions.FAILED, registerFailed);
}

export default registerWatcher;
