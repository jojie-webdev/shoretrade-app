import { put, call, takeLatest, select } from 'redux-saga/effects';
// import { goBack } from 'services/navigation';
import { updateUser } from 'services/user';
import { AsyncAction } from 'types/Action';
import { Store } from 'types/store/Store';
import {
  UpdateBankDetailsMeta,
  UpdateBankDetailsPayload,
} from 'types/store/UpdateBankDetailsState';

import { updateBankDetailsActions, getUserActions } from '../actions';

function* updateBankDetailsRequest(
  action: AsyncAction<UpdateBankDetailsMeta, UpdateBankDetailsPayload>
) {
  const state: Store = yield select();
  const userId = state.getUser.data?.data.user.id || '';
  if (state.auth.token) {
    try {
      const { data } = yield call(
        updateUser,
        {
          userId,
          bankAccount: {
            accountName: action.meta.accountName,
            accountNumber: action.meta.accountNumber,
            bsb: action.meta.bsb,
          },
          companyId: action.meta.companyId,
        },
        state.auth.token
      );
      yield put(updateBankDetailsActions.success(data));
    } catch (e) {
      yield put(updateBankDetailsActions.failed(e.message));
    }
  } else {
    yield put(updateBankDetailsActions.failed('Token not found'));
  }
}

function updateBankDetailsSuccess(
  action: AsyncAction<UpdateBankDetailsMeta, UpdateBankDetailsPayload>
) {
  // goBack();
}

function* updateBankDetailsWatcher() {
  yield takeLatest(updateBankDetailsActions.REQUEST, updateBankDetailsRequest);
  yield takeLatest(updateBankDetailsActions.SUCCESS, updateBankDetailsSuccess);
}

export default updateBankDetailsWatcher;
