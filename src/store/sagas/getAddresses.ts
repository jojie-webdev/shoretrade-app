import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getAddresses } from 'services/company';
import { AsyncAction } from 'types/Action';
import {
  GetAddressesMeta,
  GetAddressesPayload,
} from 'types/store/GetAddressesState';
import { Store } from 'types/store/Store';

import { getAddressesActions } from '../actions';
// import {currentAddressActions} from '../actions'
function* getAddressesRequest(
  action: AsyncAction<GetAddressesMeta, GetAddressesPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(getAddresses, action.meta, state.auth.token);
      yield put(getAddressesActions.success(data));
    } catch (e) {
      yield put(getAddressesActions.failed(e.message));
    }
  } else {
    yield put(getAddressesActions.failed('Token not found'));
  }
}

function* getAddressesSuccess(
  action: AsyncAction<GetAddressesMeta, GetAddressesPayload>
) {
  const pathname: string = yield select(
    (state: Store) => state.router.location.pathname
  );
  const isBuyer = pathname.includes('buyer');

  if (isBuyer) {
    const state: Store = yield select();
    if (!state.currentAddress.id) {
      const { addresses } = action.payload.data;
      const addressId = pathOr('', ['0', 'id'], addresses);
      if (addressId) {
        // yield put(
        //   currentAddressActions.update({
        //     id: addressId,
        //   })
        // );
      }
    }
  }
}

function* getAddressesWatcher() {
  yield takeLatest(getAddressesActions.REQUEST, getAddressesRequest);

  yield takeLatest(getAddressesActions.SUCCESS, getAddressesSuccess);
}

export default getAddressesWatcher;
