import { goBack } from 'connected-react-router';
import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { chargeCard } from 'services/payment';
import { AsyncAction } from 'types/Action';
import { ChargeCardMeta, ChargeCardPayload } from 'types/store/ChargeCardState';
import { Store } from 'types/store/Store';

import {
  chargeCardActions,
  getPaymentMethodsActions,
  getUserActions,
} from '../actions';

function* chargeCardRequest(
  action: AsyncAction<ChargeCardMeta, ChargeCardPayload>,
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(chargeCard, action.meta, state.auth.token);
      yield put(chargeCardActions.success(data));
    } catch (e) {
      yield put(chargeCardActions.failed(e.message));
    }
  } else {
    yield put(chargeCardActions.failed('Token not found'));
  }
}

function* chargeCardSuccess(
  action: AsyncAction<ChargeCardMeta, ChargeCardPayload>,
) {
  yield put(getUserActions.request());
  goBack();
}

function* chargeCardWatcher() {
  yield takeLatest(chargeCardActions.REQUEST, chargeCardRequest);
  yield takeLatest(chargeCardActions.SUCCESS, chargeCardSuccess);
}

export default chargeCardWatcher;
