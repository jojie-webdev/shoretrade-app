import { push } from 'connected-react-router';
import { SELLER_ROUTES } from 'consts';
import { select, put, takeLatest } from 'redux-saga/effects';
import { Action, AsyncAction } from 'types/Action';
import { HistoricalListingItem } from 'types/store/GetHistoricalListingsState';
import {
  GetListingFormDataMeta,
  GetListingFormDataPayload,
  GetListingFormDataResponse,
} from 'types/store/GetListingFormDataState';
import { Store } from 'types/store/Store';
import { UseHistoricalListingPayload } from 'types/store/UseHistoricalListingState';
import { historicalListingToEditableListing } from 'utils/Listing';

import {
  useHistoricalListingActions,
  editableListingActions,
  getListingFormDataActions,
} from '../actions';

function* useHistoricalListingStep1(
  action: Action<UseHistoricalListingPayload>
) {
  if (action.payload.id && action.payload.typeId) {
    // this will reset editable listing state and fire getListingFormDataActions
    // step 2 will be triggered when getListingFormDataActions is success
    yield put(
      editableListingActions.update({
        type: action.payload.typeId,
        currentHistoricalListingId: action.payload.id,
      })
    );
  }
}

function* useHistoricalListingStep2(
  action: AsyncAction<GetListingFormDataMeta, GetListingFormDataPayload>
) {
  if (action.payload.data.currentHistoricalListingId) {
    const historicalListings: HistoricalListingItem[] = yield select(
      (state: Store) => state.getHistoricalListings.data?.data.listings || []
    );

    const currentListing =
      historicalListings.find(
        (data) => data.id === action.payload.data.currentHistoricalListingId
      ) || null;

    const listingFormData: GetListingFormDataResponse = yield select(
      (state: Store) => state.getListingFormData.data?.data || null
    );

    yield put(
      editableListingActions.update(
        historicalListingToEditableListing(currentListing, listingFormData)
      )
    );

    yield put(push(SELLER_ROUTES.ADD_PRODUCT));
  }
}

function* useHistoricalListingWatcher() {
  yield takeLatest(
    useHistoricalListingActions.UPDATE,
    useHistoricalListingStep1
  );
  yield takeLatest(
    getListingFormDataActions.SUCCESS,
    useHistoricalListingStep2
  );
}

export default useHistoricalListingWatcher;
