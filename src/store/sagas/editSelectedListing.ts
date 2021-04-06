import { push } from 'connected-react-router';
import { SELLER_ROUTES } from 'consts';
import moment from 'moment';
import { select, put, takeLatest } from 'redux-saga/effects';
import { Action, AsyncAction } from 'types/Action';
import { EditableListingState } from 'types/store/EditableListingState';
import { EditSelectedListingPayload } from 'types/store/EditSelectedListingState';
import { GetAllListingsResponseItem } from 'types/store/GetAllListingsState';
import {
  GetListingFormDataMeta,
  GetListingFormDataPayload,
  GetListingFormDataResponse,
} from 'types/store/GetListingFormDataState';
import { Store } from 'types/store/Store';

import {
  editSelectedListingActions,
  editableListingActions,
  getListingFormDataActions,
} from '../actions';

const transform = (
  data: GetAllListingsResponseItem | null,
  formData: GetListingFormDataResponse
): EditableListingState => {
  return {
    company: data?.coopName,
    employee: data?.sellerId || '',
    states: data?.stateIds || [],
    isUngraded: data?.sizeFrom === null,
    sizeFrom: data?.sizeFrom,
    sizeTo: data?.sizeTo,
    existingImages: data?.images
      .map((image, index) => ({
        image,
        requirementId: formData.photoRequirements[index].id,
      }))
      // removes images that came from default gallery
      .filter(
        (image) =>
          // for common types
          !image.image.includes('type-default') &&
          // for custom types
          !image.image.includes('No-Image-Placeholder')
      ),
    pricePerKilo: Number(data?.pricePerKilo || 0),
    boxes: data?.boxes,
    minOrder: Number(data?.minimumOrder || 0),
    sellInMultiplesOfMinOrder: data?.sellInMultiplesOf,
    catchDate: data?.catchDate
      ? moment(data?.catchDate, 'YYYY-MM-DD').toDate()
      : undefined,
    description: data?.description || '',
    origin: data?.origin || {
      countryCode: '',
      state: '',
      suburb: '',
    },
    ends: data?.catchDate ? moment(data?.ends).toDate() : undefined,
    isAquafuture: data?.isAquafuture,
    addressId: data?.addressId || '',
    currentStep: 8,
  };
};

function* editSelectedListingStep1(action: Action<EditSelectedListingPayload>) {
  if (action.payload.id) {
    const getAllListings: GetAllListingsResponseItem[] = yield select(
      (state: Store) => state.getAllListings.data?.data?.orders || []
    );
    const currentListing =
      getAllListings.find((data) => data.id === action.payload.id) || null;

    // this will reset editable listing state and fire getListingFormDataActions
    // step 2 will be triggered when getListingFormDataActions is success
    yield put(
      editableListingActions.update({
        type: currentListing?.typeId || '',
        currentListingId: action.payload.id,
      })
    );
  }
}

function* editSelectedListingStep2(
  action: AsyncAction<GetListingFormDataMeta, GetListingFormDataPayload>
) {
  if (action.payload.data.currentListingId) {
    const getAllListings: GetAllListingsResponseItem[] = yield select(
      (state: Store) => state.getAllListings.data?.data?.orders || []
    );

    const currentListing =
      getAllListings.find(
        (data) => data.id === action.payload.data.currentListingId
      ) || null;

    const listingFormData: GetListingFormDataResponse = yield select(
      (state: Store) => state.getListingFormData.data?.data || null
    );

    yield put(
      editableListingActions.update(transform(currentListing, listingFormData))
    );

    yield put(push(SELLER_ROUTES.ADD_PRODUCT));
  }
}

function* editSelectedListingWatcher() {
  yield takeLatest(editSelectedListingActions.UPDATE, editSelectedListingStep1);
  yield takeLatest(getListingFormDataActions.SUCCESS, editSelectedListingStep2);
}

export default editSelectedListingWatcher;
