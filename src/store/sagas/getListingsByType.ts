import { lensPath, pathOr, set, view } from 'ramda';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getListingsByType } from 'services/listing';
import { AsyncAction, Action } from 'types/Action';
import {
  GetListingsByTypeMeta,
  GetListingsByTypePayload,
  GetListingsByTypeResponseListingItem,
} from 'types/store/GetListingsByTypeState';
import { Store } from 'types/store/Store';
import { findProduct } from 'utils/Listing';

import { getListingsByTypeActions, socketActions } from '../actions';

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

function* getListingByTypePatchRemaining(action: Action<any>) {
  const state: Store = yield select();
  const listingsByTypeData = state.getListingsByType.data;
  const realtimeRemaining: {
    id: string;

    remaining: number;
  } = pathOr({ id: '', remaining: 0 }, ['payload'], action);
  let idx = -1;
  try {
    if (listingsByTypeData && listingsByTypeData.data) {
      const listingsLens = lensPath(['data', 'listings']);
      const listingsData: GetListingsByTypeResponseListingItem[] = view(
        listingsLens,
        listingsByTypeData
      );
      let modifiedOrders: GetListingsByTypeResponseListingItem[] = [];
      idx = listingsData.findIndex((i) => findProduct(i, realtimeRemaining.id));
      if (idx !== -1) {
        if (realtimeRemaining.remaining !== 0) {
          modifiedOrders = listingsData.map((i) => {
            if (i.id === realtimeRemaining.id) {
              return {
                ...i,
                remaining: realtimeRemaining.remaining,
              };
            }
            return i;
          });
        } else if (realtimeRemaining.remaining === 0) {
          modifiedOrders = listingsData.filter(
            (i) => i.id !== realtimeRemaining.id
          );
        }

        const modifiedAllListing: GetListingsByTypePayload = set(
          listingsLens,
          modifiedOrders,
          listingsByTypeData
        );
        if (listingsByTypeData) {
          yield put(getListingsByTypeActions.patch(modifiedAllListing));
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function* getListingsByTypeWatcher() {
  yield takeLatest(getListingsByTypeActions.REQUEST, getListingsByTypeRequest);
  yield takeLatest(
    socketActions.UPDATE_REMAINING_BOXES,
    getListingByTypePatchRemaining
  );
}

export default getListingsByTypeWatcher;
