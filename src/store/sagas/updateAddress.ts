import { goBack } from 'connected-react-router';
import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { updateAddress } from 'services/company';
import { AsyncAction } from 'types/Action';
import { Store } from 'types/store/Store';
import {
  UpdateAddressMeta,
  UpdateAddressPayload,
} from 'types/store/UpdateAddressState';

import {
  updateAddressActions,
  getAddressesActions,
  cartActions,
  currentAddressActions,
} from '../actions';

function* updateAddressRequest(
  action: AsyncAction<UpdateAddressMeta, UpdateAddressPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(updateAddress, action.meta, state.auth.token);
      yield put(
        // Add companyId to success payload to be able to call getAddresssActions on success watcher.
        updateAddressActions.success({
          ...data,
          data: {
            ...data.data,
            companyId: action.meta.companyId,
          },
        })
      );

      if (state.auth.type === 'buyer') {
        yield put(
          currentAddressActions.update({
            id: action.meta.addressId,
          })
        );
      }
    } catch (e) {
      yield put(updateAddressActions.failed(e.message));
    }
  } else {
    yield put(updateAddressActions.failed('Token not found'));
  }
}

function* updateAddressSuccess(
  action: AsyncAction<UpdateAddressMeta, UpdateAddressPayload>
) {
  const companyId = pathOr('', ['payload', 'data', 'companyId'], action);
  yield put(cartActions.clear());
  yield put(
    getAddressesActions.request({
      companyId,
    })
  );
  goBack();
}

function* updateAddressWatcher() {
  yield takeLatest(updateAddressActions.REQUEST, updateAddressRequest);
  yield takeLatest(updateAddressActions.SUCCESS, updateAddressSuccess);
}

export default updateAddressWatcher;
