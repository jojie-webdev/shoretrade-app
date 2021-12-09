import { push } from 'connected-react-router';
import { SELLER_ROUTES } from 'consts';
import { all, put, call, takeLatest, select } from 'redux-saga/effects';
import { createCustomListing } from 'services/listing';
import { uploadImageData } from 'services/upload';
import { AsyncAction } from 'types/Action';
import {
  CreateCustomListingMeta,
  CreateCustomListingPayload,
} from 'types/store/CreateCustomListingState';
import { Store } from 'types/store/Store';
import { base64ToFile } from 'utils/File';
import { editableListingToCreateCustomListing } from 'utils/Listing';

import {
  createCustomListingActions,
  getAllListingsActions,
  editableListingActions,
} from '../actions';

function* createCustomListingRequest(
  action: AsyncAction<CreateCustomListingMeta, CreateCustomListingPayload>
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

    const payload = editableListingToCreateCustomListing(
      state.editableListing,
      imageUrls
    );
    try {
      const { data } = yield call(
        createCustomListing,
        payload,
        state.auth.token
      );
      yield put(createCustomListingActions.success(data));
    } catch (e) {
      yield put(createCustomListingActions.failed(e.message));
    }
  } else {
    yield put(createCustomListingActions.failed('Token not found'));
  }
}

function* createCustomListingSuccess(
  action: AsyncAction<CreateCustomListingMeta, CreateCustomListingPayload>
) {
  yield put(editableListingActions.clear());
  yield put(getAllListingsActions.request());
  yield put(push(SELLER_ROUTES.SELLING));
}

function* createCustomListingWatcher() {
  yield takeLatest(
    createCustomListingActions.REQUEST,
    createCustomListingRequest
  );
  yield takeLatest(
    createCustomListingActions.SUCCESS,
    createCustomListingSuccess
  );
}

export default createCustomListingWatcher;
