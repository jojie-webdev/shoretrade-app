import { push } from 'connected-react-router';
import { SELLER_ROUTES } from 'consts';
import { all, put, call, takeLatest, select } from 'redux-saga/effects';
import { updateListing } from 'services/listing';
import { uploadImageData } from 'services/upload';
import { AsyncAction } from 'types/Action';
import { Store } from 'types/store/Store';
import {
  UpdateListingMeta,
  UpdateListingPayload,
} from 'types/store/UpdateListingState';
import { base64ToFile } from 'utils/File';
import { editableListingToUpdateListing } from 'utils/Listing/editableListingToUpdateListing';

import {
  updateListingActions,
  getAllListingsActions,
  editableListingActions,
} from '../actions';

function* updateListingRequest(
  action: AsyncAction<UpdateListingMeta, UpdateListingPayload>
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

    // merge existingImages and the new imageUrls
    const newImagesData = imageUrls.reduce<Record<string, string>>(
      (accumulator, current) => ({
        ...accumulator,
        [current.requirementId]: current.url || '',
      }),
      {}
    );

    const existingImagesData = (
      state.editableListing?.existingImages || []
    ).reduce<Record<string, string>>(
      (accumulator, current) => ({
        ...accumulator,
        [current.requirementId]: current.image || '',
      }),
      {}
    );

    const mergedImagesData = {
      ...existingImagesData,
      ...newImagesData,
    };

    const companyId = state.getUser.data?.data.user.companies[0].id || '';

    const payload = editableListingToUpdateListing(
      state.editableListing,
      mergedImagesData,
      companyId
    );
    try {
      const { data } = yield call(updateListing, payload, state.auth.token);
      yield put(updateListingActions.success(data));
    } catch (e) {
      yield put(updateListingActions.failed(e.message));
    }
  } else {
    yield put(updateListingActions.failed('Token not found'));
  }
}

function* updateListingSuccess(
  action: AsyncAction<UpdateListingMeta, UpdateListingPayload>
) {
  yield put(editableListingActions.clear());
  yield put(getAllListingsActions.request());
  yield put(push(SELLER_ROUTES.SELLING));
}

function* updateListingWatcher() {
  yield takeLatest(updateListingActions.REQUEST, updateListingRequest);
  yield takeLatest(updateListingActions.SUCCESS, updateListingSuccess);
}

export default updateListingWatcher;
