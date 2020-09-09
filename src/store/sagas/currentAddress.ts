import { put, call, takeLatest, select } from 'redux-saga/effects';
import { Action } from 'types/Action';
import { CurrentAddressPayload } from 'types/store/CurrentAddressState';
import { Store } from 'types/store/Store';

import { currentAddressActions, getBuyerHomepageActions } from '../actions';

function* currentAddressRequest(action: Action<CurrentAddressPayload>) {
  const state: Store = yield select();

  if (action.payload.id && state.auth.type === 'buyer') {
    yield put(getBuyerHomepageActions.request());
  }
}

function* currentAddressWatcher() {
  yield takeLatest(currentAddressActions.UPDATE, currentAddressRequest);
}

export default currentAddressWatcher;
