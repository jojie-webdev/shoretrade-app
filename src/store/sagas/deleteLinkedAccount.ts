import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import qs from 'qs';
import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { deleteLinkedAccount } from 'services/company';
import { AsyncAction } from 'types/Action';
import {
  DeleteLinkedAccountMeta,
  DeleteLinkedAccountPayload,
} from 'types/store/DeleteLinkedAccountState';
import { Store } from 'types/store/Store';

import {
  deleteLinkedAccountActions,
  getLinkedAccountsActions,
} from '../actions';

function* deleteLinkedAccountRequest(
  action: AsyncAction<DeleteLinkedAccountMeta, DeleteLinkedAccountPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        deleteLinkedAccount,
        action.meta,
        state.auth.token
      );
      yield put(
        // Add companyId to success payload to be able to call getLinkedAccountsActions on success watcher.
        deleteLinkedAccountActions.success({
          ...data,
          data: {
            ...data.data,
            companyId: action.meta.companyId,
          },
        })
      );
    } catch (e) {
      yield put(deleteLinkedAccountActions.failed(e.message));
    }
  } else {
    yield put(deleteLinkedAccountActions.failed('Token not found'));
  }
}

function* deleteLinkedAccountSuccess(
  action: AsyncAction<DeleteLinkedAccountMeta, DeleteLinkedAccountPayload>
) {
  const companyId = pathOr('', ['payload', 'data', 'companyId'], action);

  yield put(
    getLinkedAccountsActions.request({
      companyId,
    })
  );

  yield put(
    push(
      `${SELLER_ACCOUNT_ROUTES.ASSISTANTS}${qs.stringify(
        { companyId },
        { addQueryPrefix: true }
      )}`
    )
  );
}

function* deleteLinkedAccountWatcher() {
  yield takeLatest(
    deleteLinkedAccountActions.REQUEST,
    deleteLinkedAccountRequest
  );
  yield takeLatest(
    deleteLinkedAccountActions.SUCCESS,
    deleteLinkedAccountSuccess
  );
}

export default deleteLinkedAccountWatcher;
