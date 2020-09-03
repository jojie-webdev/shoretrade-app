import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { addAddress } from 'services/company';
import { AsyncAction } from 'types/Action';
import { AddAddressMeta, AddAddressPayload } from 'types/store/AddAddressState';
import { Store } from 'types/store/Store';

import {
  addAddressActions,
  getUserActions,
  getAddressesActions,
} from '../actions';

function* addAddressRequest(
  action: AsyncAction<AddAddressMeta, AddAddressPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(addAddress, action.meta, state.auth.token);
      yield put(
        // Add companyId to success payload to be able to call getAddresssActions on success watcher.
        addAddressActions.success({
          ...data,
          data: {
            ...data.data,
            companyId: action.meta.companyId,
          },
        })
      );
    } catch (e) {
      yield put(addAddressActions.failed(e.message));
    }
  } else {
    yield put(addAddressActions.failed('Token not found'));
  }
}

function* addAddressSuccess(
  action: AsyncAction<AddAddressMeta, AddAddressPayload>
) {
  const companyId = pathOr('', ['payload', 'data', 'companyId'], action);
  yield put(
    getAddressesActions.request({
      companyId,
    })
  );
}

function* addAddressWatcher() {
  yield takeLatest(addAddressActions.REQUEST, addAddressRequest);
  yield takeLatest(addAddressActions.SUCCESS, addAddressSuccess);
}

export default addAddressWatcher;
