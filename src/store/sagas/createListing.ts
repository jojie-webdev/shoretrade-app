import { push } from 'connected-react-router';
import { ADD_PRODUCT_ROUTES, SELLER_ROUTES } from 'consts';
import { all, put, call, takeLatest, select, delay } from 'redux-saga/effects';
import { createListing } from 'services/listing';
import { uploadImageData } from 'services/upload';
import { AsyncAction } from 'types/Action';
import {
  CreateListingMeta,
  CreateListingPayload,
} from 'types/store/CreateListingState';
import { Store } from 'types/store/Store';
import { base64ToFile } from 'utils/File';
import { editableListingToCreateListing } from 'utils/Listing';

import {
  createListingActions,
  getAllListingsActions,
  editableListingActions,
} from '../actions';

function* createListingRequest(
  action: AsyncAction<CreateListingMeta, CreateListingPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    const editableListingImages = state.editableListing?.images || [];
    const editableListingImageFiles: File[] = yield all(
      editableListingImages.map(({ image }) => {
        return call(base64ToFile, image.data, image.name, image.type);
      })
    );
    const multiImageUploadResponse: {
      status: number;
      data: { url: string };
    }[] = yield all(
      editableListingImageFiles.map((file) => {
        return call(uploadImageData, {
          file,
          asset: 'listing',
        });
      })
    );

    const imageUrls = multiImageUploadResponse
      .map(({ data }, index) => ({
        url: data.url,
        requirementId: editableListingImages[index].requirementId,
      }))
      .filter((image) => !!image.url);

    const payload = editableListingToCreateListing(
      state.editableListing,
      imageUrls
    );
    try {
      const { data } = yield call(createListing, payload, state.auth.token);
      yield put(createListingActions.success(data));
    } catch (e) {
      yield put(createListingActions.failed(e.message));
    }
  } else {
    yield put(createListingActions.failed('Token not found'));
  }
}

function* createListingSuccess(
  action: AsyncAction<CreateListingMeta, CreateListingPayload>
) {
  yield put(getAllListingsActions.request());
  yield delay(10000);
  yield put(editableListingActions.clear());
  yield put(push(SELLER_ROUTES.SELLING));
}

function* createListingWatcher() {
  yield takeLatest(createListingActions.REQUEST, createListingRequest);
  yield takeLatest(createListingActions.SUCCESS, createListingSuccess);
}

export default createListingWatcher;
