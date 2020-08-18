import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest } from 'redux-saga/effects';
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
      const { data: profileImage } = yield call(uploadImageData, {
        file: action.meta.businessLogo,
        asset: 'company',
      });
      profileImageUrl = profileImage.url;
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
      };
    };

    // const { data } = yield call(
    //   register,
    //   action.meta.userGroup,
    //   transformMetaToRequest(action.meta)
    // );

    // yield put(registerActions.success(data));

    // yield put(registerActions.success(data));
    console.log('Finished', profileImageUrl);
  } catch (e) {
    console.log(e);
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
