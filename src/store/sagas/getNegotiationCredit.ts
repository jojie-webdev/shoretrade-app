import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getCompanyNegotiationCredit } from 'services/company';
import { AsyncAction } from 'types/Action';
import {
  GetNegotiationCreditMeta,
  GetNegotiationCreditPayload,
} from 'types/store/GetNegotiationCreditState';
import { Store } from 'types/store/Store';

import { getNegotiationCreditActions } from '../actions';

function* getNegotiationCreditRequest(
  action: AsyncAction<GetNegotiationCreditMeta, GetNegotiationCreditPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getCompanyNegotiationCredit,
        action.meta,
        state.auth.token
      );
      yield put(getNegotiationCreditActions.success(data));
    } catch (e) {
      yield put(getNegotiationCreditActions.failed(e.message));
    }
  } else {
    yield put(getNegotiationCreditActions.failed('Token not found'));
  }
}

function* getNegotiationCreditWatcher() {
  yield takeLatest(
    getNegotiationCreditActions.REQUEST,
    getNegotiationCreditRequest
  );
}

export default getNegotiationCreditWatcher;
