import { push } from 'connected-react-router';
import { SELLER_ROUTES } from 'consts';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { createBulkListing } from 'services/listing';
import { AsyncAction } from 'types/Action';
import {
  CreateBulkListingMeta,
  CreateBulkListingPayload,
} from 'types/store/CreateBulkListingState';
import { Store } from 'types/store/Store';
import { bulkListingToCreateListing } from 'utils/Listing/bulkListingToCreateListing';

import {
  createBulkListingActions,
  getAllListingsActions,
  modifyBulkUploadActions,
  uploadBulkActions,
} from '../actions';

function* createBulkListingRequest(
  action: AsyncAction<CreateBulkListingMeta, CreateBulkListingPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    const { data, shippingAddress } = action.meta;
    const payload = data.map((l) =>
      bulkListingToCreateListing(l, shippingAddress)
    );

    try {
      const { data } = yield call(createBulkListing, payload, state.auth.token);
      yield put(createBulkListingActions.success(data));
    } catch (e) {
      const errorData = e.response.data;
      const message = errorData.errors.map(
        (e: string) => e.charAt(0).toUpperCase() + e.slice(1)
      );

      yield put(createBulkListingActions.failed(message));
    }
  } else {
    yield put(createBulkListingActions.failed('Token not found'));
  }
}

function* createBulkListingSuccess(
  action: AsyncAction<CreateBulkListingMeta, CreateBulkListingPayload>
) {
  yield put(modifyBulkUploadActions.clear());
  yield put(uploadBulkActions.clear());
  yield put(getAllListingsActions.request());
  yield put(push(SELLER_ROUTES.SELLING));
}

function* createBulkListingWatcher() {
  yield takeLatest(createBulkListingActions.REQUEST, createBulkListingRequest);
  yield takeLatest(createBulkListingActions.SUCCESS, createBulkListingSuccess);
}

export default createBulkListingWatcher;
