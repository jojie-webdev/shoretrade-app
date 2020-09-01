import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getListingTypesByCategory } from 'services/listing';
import { AsyncAction } from 'types/Action';
import {
  GetListingTypesByCategoryMeta,
  GetListingTypesByCategoryPayload,
} from 'types/store/GetListingTypesByCategoryState';
import { Store } from 'types/store/Store';

import { getListingTypesByCategoryActions } from '../actions';

function* getListingTypesByCategoryRequest(
  action: AsyncAction<
    GetListingTypesByCategoryMeta,
    GetListingTypesByCategoryPayload
  >
) {
  const state: Store = yield select();
  console.log({ token: state.auth.token, addressId: state.currentAddress.id });
  if (state.auth.token && state.currentAddress.id) {
    try {
      const { data } = yield call(
        getListingTypesByCategory,
        {
          addressId: state.currentAddress.id,
          categoryId: action.meta.categoryId,
        },
        state.auth.token
      );
      yield put(getListingTypesByCategoryActions.success(data));
    } catch (e) {
      yield put(getListingTypesByCategoryActions.failed(e.message));
    }
  } else {
    yield put(getListingTypesByCategoryActions.failed('Token not found'));
  }
}

function* getListingTypesByCategoryWatcher() {
  yield takeLatest(
    getListingTypesByCategoryActions.REQUEST,
    getListingTypesByCategoryRequest
  );
}

export default getListingTypesByCategoryWatcher;
