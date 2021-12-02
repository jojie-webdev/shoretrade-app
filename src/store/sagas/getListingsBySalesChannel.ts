import { lensPath, pathOr, set, view } from 'ramda';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getListingsBySalesChannel } from 'services/listing';
import { AsyncAction, Action } from 'types/Action';
import { 
  GetListingsBySalesChannelMeta,
  GetListingsBySalesChannelPayload,
  GetListingsBySalesChannelResponseItem
} from 'types/store/GetListingsBySalesChannelState';
import { Store } from 'types/store/Store';
import { findProduct } from 'utils/Listing';

import { getListingsBySalesChannelActions, socketActions } from '../actions';

function* getListingsBySalesChannelRequest(
  action: AsyncAction<GetListingsBySalesChannelMeta, GetListingsBySalesChannelPayload>
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
                remaining: realtimeRemaining.remaining,
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
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function* getListingsBySalesChannelWatcher() {
  yield takeLatest(getListingsBySalesChannelActions.REQUEST, getListingsBySalesChannelRequest);
  yield takeLatest(
    socketActions.UPDATE_REMAINING_BOXES,
    getListingsBySalesChannelPatchRemaining
  );
}

export default getListingsBySalesChannelWatcher;
