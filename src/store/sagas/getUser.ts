import { lensPath, set, view } from 'ramda';
import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getUser } from 'services/auth';
import { AsyncAction, Action } from 'types/Action';
import {
  GetUserMeta,
  GetUserPayload,
  UserCompany,
} from 'types/store/GetUserState';
import { Store } from 'types/store/Store';

import {
  getUserActions,
  authActions,
  getAddressesActions,
  getPaymentModeActions,
  socketActions,
  getCartActions,
  getActivePlanActions,
  getCompanyPlanActions,
} from '../actions';
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
  const state: Store = yield select();
  const { companies } = action.payload.data.user;
  const companyId: string = pathOr('', ['0', 'id'], companies);

  if (state.auth.type === 'buyer') {
    yield put(getPaymentModeActions.request({}));
    if (companyId) {
      yield put(getCompanyPlanActions.request({ companyId }));
      if (
        (state.getAddresses.data?.data.addresses || []).length === 0 ||
        state.getAddresses.request?.companyId !== companyId
      ) {
        yield put(getAddressesActions.request({ companyId }));
      }

      // avoids calling request twice
      if (state.router.location.pathname !== '/buyer/checkout') {
        const defaultCompany =
          companies.find((company) => company.relationship === 'ADMIN') ||
          // Fallback if company have no admin relationship
          companies.find(
            (company) =>
              company.relationship === 'ASSISTANT' ||
              company.relationship === 'SECONDARY'
          );

        if (defaultCompany) {
          yield put(
            getCartActions.request({
              employeeId: defaultCompany?.employeeId || '',
            })
          );
        }
      }
    }
  } else {
    if (companyId) {
      yield put(getCompanyPlanActions.request({ companyId }));
      if (
        (state.getAddresses.data?.data.addresses || []).length === 0 ||
        state.getAddresses.request?.companyId !== companyId
      ) {
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

function* getUserPatchCredit(action: Action<any>) {
  const state: Store = yield select();
  const getUser = state.getUser.data;
  const realtimeCredit = pathOr(0, ['payload'], action);
  try {
    if (getUser) {
      const companiesLens = lensPath(['data', 'user', 'companies']);
      const companiesData: UserCompany[] = view(companiesLens, getUser);
      const modifiedCompanies = companiesData.map((i, index) => {
        if (index === 0) {
          return {
            ...i,
            credit: realtimeCredit,
          };
        }
        return i;
      });

      const modifiedGetUser: GetUserPayload = set(
        companiesLens,
        modifiedCompanies,
        getUser
      );

      yield put(getUserActions.patch(modifiedGetUser));
    }
  } catch (err) {
    console.log(err);
  }
}

function* getUserWatcher() {
  yield takeLatest(getUserActions.REQUEST, getUserRequest);
  yield takeLatest(getUserActions.SUCCESS, getUserSuccess);
  yield takeLatest(socketActions.NEW_CREDIT, getUserPatchCredit);
  yield takeLatest(getUserActions.FAILED, getUserFailed);
}

export default getUserWatcher;
