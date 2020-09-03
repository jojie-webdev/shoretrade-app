import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getSellerByCompanyId } from 'services/company';
import getSellerByIdActions from 'store/actions/getSellerById';
import { AsyncAction } from 'types/Action';
import {
  GetSellerByIdMeta,
  GetSellerByIdPayload,
} from 'types/store/GetSellerByIdState';
import { Store } from 'types/store/Store';

export function* getSellerByIdRequest(
  action: AsyncAction<GetSellerByIdMeta, GetSellerByIdPayload>,
) {
  const state: Store = yield select();

  try {
    if (!state.auth.token) {
      throw new Error('Token not found');
    }
    const { data } = yield call(
      getSellerByCompanyId,
      action.meta,
      state.auth.token,
    );

    if (data) {
      yield put(getSellerByIdActions.success({ ...data }));
    }
  } catch (e) {
    // yield put(getPaymentMethodsActions.failed('Token not found'));
    console.error(e);
  }
}

function* getSellerByIdSuccess(
  action: AsyncAction<GetSellerByIdMeta, GetSellerByIdPayload>,
) {
  // TODO: Add functionality
}

function* getSellerByIdWatcher() {
  yield takeLatest(getSellerByIdActions.REQUEST, getSellerByIdRequest);
  yield takeLatest(getSellerByIdActions.SUCCESS, getSellerByIdSuccess);
  // yield takeLatest(loginActions.FAILED, loginFailed);
}

export default getSellerByIdWatcher;
