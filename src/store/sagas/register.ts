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
      url_back?: string;
      expired_at: string;
      state_id: string;
      file_type_back?: string;
    }[] = [];

    if (action.meta.licenses && action.meta.licenses?.length > 0) {
      const promisesArray: CallEffect<{
        status: number;
        data: {
          url: string;
        };
      }>[] = [];
      const backPromisesArray: CallEffect<{
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
        if (license.fileBack) {
          backPromisesArray.push(
            call(uploadImageData, {
              file: license.fileBack,
              asset: 'company',
            })
          );
        }
      });

      const dataArr: {
        status: number;
        data: {
          url: string;
        };
      }[] = yield all(promisesArray);
      const backDataArr: {
        status: number;
        data: {
          url: string;
        };
      }[] = yield all(backPromisesArray);

      sellerLicenses = dataArr.map(({ data }, ndx) => {
        const { data: backData } = backDataArr[ndx] || {};
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
          url_back: backData?.url,
          file_type_back: fileType,
          state_id: action.meta.licenses![ndx].stateId || '',
          expired_at: action.meta.licenses![ndx].expiredAt || '',
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
          cardToken: data.cardToken,
          subscriptionType: {
            plan: data.subscriptionType.plan,
            reverseMarketPlace: data.subscriptionType.reverseMarketPlace,
          },
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
        sfmNumber: data.sfmNumber,
        debtFinancingSegment: data.debtFinancingSegment || '',
        debtFinancingEstRevenue: Number(data.debtFinancingEstRevenue || 0),
        registerDebtFinancing: data.registerDebtFinancing || false,
        marketSector: data.marketSector,
        marketBuying: data.marketBuying,
        cardToken: data.cardToken,
        subscriptionType: {
          plan: data.subscriptionType.plan,
          reverseMarketPlace: data.subscriptionType.reverseMarketPlace,
        },
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
