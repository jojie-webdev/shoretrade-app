import { lensPath, pathOr, set, view } from 'ramda';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getListingsBySalesChannel } from 'services/listing';
import { AsyncAction, Action } from 'types/Action';
import {
  GetListingsBySalesChannelMeta,
  GetListingsBySalesChannelPayload,
  GetListingsBySalesChannelResponseItem,
} from 'types/store/GetListingsBySalesChannelState';
import { Store } from 'types/store/Store';
import { findProduct } from 'utils/Listing';

import { getListingsBySalesChannelActions, socketActions } from '../actions';

function* getListingsBySalesChannelRequest(
  action: AsyncAction<
    GetListingsBySalesChannelMeta,
    GetListingsBySalesChannelPayload
  >
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getListingsBySalesChannel,
        action.meta,
        state.auth.token
      );

      yield put(getListingsBySalesChannelActions.success(data));
    } catch (e) {
      yield put(getListingsBySalesChannelActions.failed(e.message));
    }
  } else {
    yield put(getListingsBySalesChannelActions.failed('Token not found'));
  }
}

function* getListingsBySalesChannelPatchRemaining(action: Action<any>) {
  const state: Store = yield select();
  const previousRequest = state.getListingsBySalesChannel.request;
  const getListingsBySalesChannelState = state.getListingsBySalesChannel.data;
  const realtimeRemaining: {
    id: string;
    remaining: number;
  } = pathOr({ id: '', remaining: 0 }, ['payload'], action);
  let idx = -1;
  try {
    if (getListingsBySalesChannelState && getListingsBySalesChannelState.data) {
      const listingsLens = lensPath(['data', 'listings']);
      const listingsData: GetListingsBySalesChannelResponseItem[] = view(
        listingsLens,
        getListingsBySalesChannelState
      );
      let modifiedListings: GetListingsBySalesChannelResponseItem[] = [];
      idx = listingsData.findIndex((i) => findProduct(i, realtimeRemaining.id));
      if (idx !== -1) {
        if (realtimeRemaining.remaining !== 0) {
          modifiedListings = listingsData.map((i) => {
            if (i.listing_id === realtimeRemaining.id) {
              return {
                ...i,
                remaining_weight: realtimeRemaining.remaining,
              };
            }
            return i;
          });
        } else if (realtimeRemaining.remaining === 0) {
          modifiedListings = listingsData.filter(
            (i) => i.listing_id !== realtimeRemaining.id
          );
        }

        const modifiedAllListing: GetListingsBySalesChannelPayload = set(
          listingsLens,
          modifiedListings,
          getListingsBySalesChannelState
        );

        if (getListingsBySalesChannelState) {
          yield put(getListingsBySalesChannelActions.patch(modifiedAllListing));
        }
      } else if (previousRequest) {
        yield put(getListingsBySalesChannelActions.request(previousRequest));
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function* getListingsBySalesChannelPatchUpdate(action: Action<any>) {
  const state: Store = yield select();
  const previousRequest = state.getListingsBySalesChannel.request;
  const getListingsBySalesChannelState = state.getListingsBySalesChannel.data;
  const realtimeData: {
    id: string;
    remaining: number;
    price?: string;
    minimumOrder?: string;
    boxes?: {
      count: number;
      id: string;
      quantity: number;
      weight: number;
    }[];
  } = pathOr({ id: '', remaining: 0 }, ['payload'], action);
  let idx = -1;

  try {
    if (getListingsBySalesChannelState && getListingsBySalesChannelState.data) {
      const listingsLens = lensPath(['data', 'listings']);
      const listingsData: GetListingsBySalesChannelResponseItem[] = view(
        listingsLens,
        getListingsBySalesChannelState
      );
      let modifiedListings: GetListingsBySalesChannelResponseItem[] = [];
      idx = listingsData.findIndex((i) => findProduct(i, realtimeData.id));
      if (idx !== -1) {
        if (realtimeData.remaining !== 0) {
          modifiedListings = listingsData.map((i) => {
            if (i.listing_id === realtimeData.id) {
              return {
                ...i,
                price_per_kilo: realtimeData.price || i.price_per_kilo,
                remaining_weight: realtimeData.remaining,
              };
            }
            return i;
          });
        } else if (realtimeData.remaining === 0) {
          modifiedListings = listingsData.filter(
            (i) => i.listing_id !== realtimeData.id
          );
        }

        const modifiedAllListing: GetListingsBySalesChannelPayload = set(
          listingsLens,
          modifiedListings,
          getListingsBySalesChannelState
        );

        yield put(getListingsBySalesChannelActions.patch(modifiedAllListing));
      } else if (previousRequest) {
        yield put(getListingsBySalesChannelActions.request(previousRequest));
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function* getListingsBySalesChannelWatcher() {
  yield takeLatest(
    getListingsBySalesChannelActions.REQUEST,
    getListingsBySalesChannelRequest
  );
  yield takeLatest(
    socketActions.UPDATE_REMAINING_BOXES,
    getListingsBySalesChannelPatchRemaining
  );
  yield takeLatest(
    socketActions.UPDATE_LISTING,
    getListingsBySalesChannelPatchUpdate
  );
}

export default getListingsBySalesChannelWatcher;
