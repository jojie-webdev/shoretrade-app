import { goBack } from 'connected-react-router';
import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { addCardToken } from 'services/payment';
import { createCardToken } from 'services/stripe';
import { AsyncAction } from 'types/Action';
import {
  AddCardTokenMeta,
  AddCardTokenPayload,
} from 'types/store/AddCardTokenState';
import { Store } from 'types/store/Store';

import {
  addCardTokenActions,
  getUserActions,
  getPaymentMethodsActions,
} from '../actions';

function* addCardTokenRequest(
  action: AsyncAction<AddCardTokenMeta, AddCardTokenPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data: cardTokenData } = yield call(
        createCardToken,
        action.meta.card
      );
      const { data } = yield call(
        addCardToken,
        {
          token: cardTokenData.id,
          companyId: action.meta.companyId,
          default: action.meta.default,
        },
        state.auth.token
      );
      yield put(
        // Add companyId to success payload to be able to call getPaymentMethodsActions on success watcher.
        addCardTokenActions.success({
          ...data,
          data: {
            ...data.data,
            companyId: action.meta.companyId,
          },
        })
      );
    } catch (e) {
      yield put(addCardTokenActions.failed(e.message));
    }
  } else {
    yield put(addCardTokenActions.failed('Token not found'));
  }
}

function* addCardTokenSuccess(
  action: AsyncAction<AddCardTokenMeta, AddCardTokenPayload>
) {
  const companyId = pathOr('', ['payload', 'data', 'companyId'], action);
  if (companyId) {
    yield put(getPaymentMethodsActions.request({ companyId }));
  }
  goBack();
}

function* addCardTokenWatcher() {
  yield takeLatest(addCardTokenActions.REQUEST, addCardTokenRequest);
  yield takeLatest(addCardTokenActions.SUCCESS, addCardTokenSuccess);
}

export default addCardTokenWatcher;
