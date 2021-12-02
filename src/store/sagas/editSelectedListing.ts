import { push } from 'connected-react-router';
import { SELLER_ROUTES } from 'consts';
import { select, put, takeLatest } from 'redux-saga/effects';
import { Action, AsyncAction } from 'types/Action';
import { EditSelectedListingPayload } from 'types/store/EditSelectedListingState';
import { GetListingsBySalesChannelResponseItem } from 'types/store/GetListingsBySalesChannelState';
import {
  GetListingFormDataMeta,
  GetListingFormDataPayload,
  GetListingFormDataResponse,
} from 'types/store/GetListingFormDataState';
import { Store } from 'types/store/Store';
import { editableListingToEditSelectedListing } from 'utils/Listing/editableListingToEditSelectedListing';

import {
  editSelectedListingActions,
  editableListingActions,
  getListingFormDataActions,
} from '../actions';

function* editSelectedListingStep1(action: Action<EditSelectedListingPayload>) {
  if (action.payload.id) {
    const allListings: GetListingsBySalesChannelResponseItem[] = yield select(
      (state: Store) => state.getListingsBySalesChannel.data?.data?.listings || []
    );
    const currentListing = allListings.find((data) => 
      data.listing_id === action.payload.id
    ) || null;

    // this will reset editable listing state and fire getListingFormDataActions
    // step 2 will be triggered when getListingFormDataActions is success
    yield put(
      editableListingActions.update({
        type: currentListing?.type_id || '',
        currentListingId: action.payload.id,
      })
    );
  }
}

function* editSelectedListingStep2(
  action: AsyncAction<GetListingFormDataMeta, GetListingFormDataPayload>
) {
  if (action.payload.data.currentListingId) {
    const allListings: GetListingsBySalesChannelResponseItem[] = yield select(
      (state: Store) => state.getListingsBySalesChannel.data?.data?.listings || []
    );
    const currentListing = allListings.find((data) => 
      data.listing_id === action.payload.data.currentListingId
    ) || null;

    const listingFormData: GetListingFormDataResponse = yield select(
      (state: Store) => state.getListingFormData.data?.data || null
    );

    yield put(
      editableListingActions.update(
        editableListingToEditSelectedListing(currentListing, listingFormData)
      )
    );

    yield put(push(SELLER_ROUTES.ADD_PRODUCT));
  }
}

function* editSelectedListingWatcher() {
  yield takeLatest(editSelectedListingActions.UPDATE, editSelectedListingStep1);
  yield takeLatest(getListingFormDataActions.SUCCESS, editSelectedListingStep2);
}

export default editSelectedListingWatcher;
