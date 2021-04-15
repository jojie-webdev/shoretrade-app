import { push } from 'connected-react-router';
import { ADD_PRODUCT_ROUTES } from 'consts';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { uploadBulkListingCSV } from 'services/listing';
import { AsyncAction } from 'types/Action';
import { Store } from 'types/store/Store';
import { UploadBulkMeta, UploadBulkPayload } from 'types/store/UploadBulkState';

import { modifyBulkUploadActions, uploadBulkActions } from '../actions';

function* uploadBulkRequest(
  action: AsyncAction<UploadBulkMeta, UploadBulkPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        uploadBulkListingCSV,
        action.meta,
        state.auth.token
      );
      yield put(uploadBulkActions.success(data));
    } catch (e) {
      yield put(uploadBulkActions.failed(e.message));
    }
  } else {
    yield put(uploadBulkActions.failed('Token not found'));
  }
}

function* uploadBulkSuccess(
  action: AsyncAction<UploadBulkMeta, UploadBulkPayload>
) {
  yield put(modifyBulkUploadActions.clear());
  yield put(push(ADD_PRODUCT_ROUTES.BULK_UPLOAD_PREVIEW));
}

function* uploadBulkWatcher() {
  yield takeLatest(uploadBulkActions.REQUEST, uploadBulkRequest);
  yield takeLatest(uploadBulkActions.SUCCESS, uploadBulkSuccess);
}

export default uploadBulkWatcher;
