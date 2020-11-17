import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getBankDetails } from 'services/company';
import { AsyncAction } from 'types/Action';
import {
  GetBankDetailsMeta,
  GetBankDetailsPayload,
} from 'types/store/GetBankDetailsState';
import { Store } from 'types/store/Store';

import { getBankDetailsActions } from '../actions';

function* getBankDetailsRequest(
  action: AsyncAction<GetBankDetailsMeta, GetBankDetailsPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getBankDetails,
        action.meta,
        state.auth.token
      );
      yield put(getBankDetailsActions.success(data));
    } catch (e) {
      yield put(getBankDetailsActions.failed(e.message));
    }
  } else {
    yield put(getBankDetailsActions.failed('Token not found'));
  }
}

function* getBankDetailsWatcher() {
  yield takeLatest(getBankDetailsActions.REQUEST, getBankDetailsRequest);
}

export default getBankDetailsWatcher;
