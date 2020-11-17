import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { addLinkedAccount } from 'services/company';
import { AsyncAction } from 'types/Action';
import {
  AddLinkedAccountMeta,
  AddLinkedAccountPayload,
} from 'types/store/AddLinkedAccountState';
import { Store } from 'types/store/Store';

import { addLinkedAccountActions, getLinkedAccountsActions } from '../actions';

function* addLinkedAccountRequest(
  action: AsyncAction<AddLinkedAccountMeta, AddLinkedAccountPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        addLinkedAccount,
        action.meta,
        state.auth.token
      );
      yield put(
        // Add companyId to success payload to be able to call getLinkedAccountsActions on success watcher.
        addLinkedAccountActions.success({
          ...data,
          data: {
            ...data.data,
            companyId: action.meta.companyId,
          },
        })
      );
    } catch (e) {
      if (e.response) {
        const errorMessage = pathOr(
          e.message,
          ['response', 'data', 'message'],
          e
        );
        yield put(addLinkedAccountActions.failed(errorMessage));
      } else {
        yield put(addLinkedAccountActions.failed(e.message));
      }
    }
  } else {
    yield put(addLinkedAccountActions.failed('Token not found'));
  }
}

// function* addLinkedAccountSuccess(
//   action: AsyncAction<AddLinkedAccountMeta, AddLinkedAccountPayload>
// ) {
//   const companyId = pathOr('', ['payload', 'data', 'companyId'], action);
//   yield put(
//     getLinkedAccountsActions.request({
//       companyId,
//     })
//   );
// }

function* addLinkedAccountWatcher() {
  yield takeLatest(addLinkedAccountActions.REQUEST, addLinkedAccountRequest);
  // yield takeLatest(addLinkedAccountActions.SUCCESS, addLinkedAccountSuccess);
}

export default addLinkedAccountWatcher;
