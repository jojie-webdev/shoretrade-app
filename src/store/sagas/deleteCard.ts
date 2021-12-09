import { push } from 'connected-react-router';
import { BUYER_ACCOUNT_ROUTES } from 'consts';
import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { deleteCard } from 'services/payment';
import { AsyncAction } from 'types/Action';
import { DeleteCardMeta, DeleteCardPayload } from 'types/store/DeleteCardState';
import { Store } from 'types/store/Store';

import { deleteCardActions, getPaymentMethodsActions } from '../actions';

function* deleteCardRequest(
  action: AsyncAction<DeleteCardMeta, DeleteCardPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(deleteCard, action.meta, state.auth.token);
      yield put(
        // Add companyId to success payload to be able to call getPaymentMethodsActions on success watcher.
        deleteCardActions.success({
          ...data,
          data: {
            ...data.data,
            companyId: action.meta.companyId,
          },
        })
      );
    } catch (e) {
      yield put(deleteCardActions.failed(e.message));
    }
  } else {
    yield put(deleteCardActions.failed('Token not found'));
  }
}

function* deleteCardSuccess(
  action: AsyncAction<DeleteCardMeta, DeleteCardPayload>
) {
  const companyId = pathOr('', ['payload', 'data', 'companyId'], action);
  if (companyId) {
    yield put(getPaymentMethodsActions.request({ companyId }));
  }
  yield put(push(`${BUYER_ACCOUNT_ROUTES.BANK_DETAILS}`));
}

function* deleteCardWatcher() {
  yield takeLatest(deleteCardActions.REQUEST, deleteCardRequest);
  yield takeLatest(deleteCardActions.SUCCESS, deleteCardSuccess);
}

export default deleteCardWatcher;
