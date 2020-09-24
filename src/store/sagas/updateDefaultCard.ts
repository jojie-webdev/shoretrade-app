import { goBack } from 'connected-react-router';
import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { updateDefaultCard } from 'services/payment';
import { AsyncAction } from 'types/Action';
import { Store } from 'types/store/Store';
import {
  UpdateDefaultCardMeta,
  UpdateDefaultCardPayload,
} from 'types/store/UpdateDefaultCardState';

import { updateDefaultCardActions, getPaymentMethodsActions } from '../actions';

function* updateDefaultCardRequest(
  action: AsyncAction<UpdateDefaultCardMeta, UpdateDefaultCardPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        updateDefaultCard,
        action.meta,
        state.auth.token
      );
      yield put(
        // Add companyId to success payload to be able to call getPaymentMethodsActions on success watcher.
        updateDefaultCardActions.success({
          ...data,
          data: {
            ...data.data,
            companyId: action.meta.companyId,
          },
        })
      );
    } catch (e) {
      yield put(updateDefaultCardActions.failed(e.message));
    }
  } else {
    yield put(updateDefaultCardActions.failed('Token not found'));
  }
}

function* updateDefaultCardSuccess(
  action: AsyncAction<UpdateDefaultCardMeta, UpdateDefaultCardPayload>
) {
  const companyId = pathOr('', ['payload', 'data', 'companyId'], action);
  if (companyId) {
    yield put(getPaymentMethodsActions.request({ companyId }));
  }
  goBack();
}

function* updateDefaultCardWatcher() {
  yield takeLatest(updateDefaultCardActions.REQUEST, updateDefaultCardRequest);
  yield takeLatest(updateDefaultCardActions.SUCCESS, updateDefaultCardSuccess);
}

export default updateDefaultCardWatcher;
