import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getListingsByType } from 'services/listing';
import { AsyncAction } from 'types/Action';
import {
  GetListingsByTypeMeta,
  GetListingsByTypePayload,
} from 'types/store/GetListingsByTypeState';
import { Store } from 'types/store/Store';

import { getListingsByTypeActions } from '../actions';

function* getListingsByTypeRequest(
  action: AsyncAction<GetListingsByTypeMeta, GetListingsByTypePayload>
) {
  const state: Store = yield select();
  if (state.auth.token && state.currentAddress.id) {
    try {
      const { data } = yield call(
        getListingsByType,
        { typeId: action.meta.typeId, addressId: state.currentAddress.id },
        { ...action.meta.filterData },
        state.auth.token
      );
      yield put(getListingsByTypeActions.success(data));
    } catch (e) {
      yield put(getListingsByTypeActions.failed(e.message));
    }
  } else {
    yield put(getListingsByTypeActions.failed('Token not found'));
  }
}

function* getListingsByTypeWatcher() {
  yield takeLatest(getListingsByTypeActions.REQUEST, getListingsByTypeRequest);
}

export default getListingsByTypeWatcher;
