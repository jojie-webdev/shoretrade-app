import { lensPath, pathOr, set, view } from 'ramda';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getListing } from 'services/listing';
import socketGetListing from 'store/reducers/socketGetListing';
import { AsyncAction, SocketAction } from 'types/Action';
import { GetListingMeta, GetListingPayload, GetListingResponseItem } from 'types/store/GetListingState';
import { SocketGetListingMeta, SocketGetListingPayload } from 'types/store/socketGetListingState';
import { Store } from 'types/store/Store';
import { findProduct } from 'utils/Listing';

import { getListingActions, socketGetListingActions } from '../actions';

function* getListingRequest(
  action: AsyncAction<GetListingMeta, GetListingPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(getListing, action.meta, state.auth.token);
      yield put(getListingActions.success(data));
    } catch (e) {
      yield put(getListingActions.failed(e.message));
    }
  } else {
    yield put(getListingActions.failed('Token not found'));
  }
}

function* handleSocketEvent(
  action: SocketAction<SocketGetListingMeta, SocketGetListingPayload>
) {
  const state: Store = yield select();
  const getListingData = state.getListing.data;
  const realtimeRemaining: {
    id: string;

    remaining: number;
  } = pathOr({ id: '', remaining: 0 }, ['payload'], action);
  let idx = -1;
  try {
    if (getListingData && getListingData.data) {
      const listingLens = lensPath(['data', 'listing']);
      const listingData: GetListingResponseItem[] = view(
        listingLens,
        getListingData
      );
      let modifiedListing: GetListingResponseItem[] = [];
      idx = listingData.findIndex((i) => findProduct(i, realtimeRemaining.id));
      if (idx !== -1) {
        if (realtimeRemaining.remaining !== 0) {
          modifiedListing = listingData.map((i) => {
            if (i.id === realtimeRemaining.id) {
              return {
                ...i,
                remaining: realtimeRemaining.remaining,
              };
            }
            return i;
          });
        } else if (realtimeRemaining.remaining === 0) {
          modifiedListing = listingData.filter(
            (i) => i.id !== realtimeRemaining.id
          );
        }

        const modifiedLstingData: GetListingPayload = set(
          listingLens,
          modifiedListing,
          getListingData
        );
        if (getListingData) {
          yield put(getListingActions.success(modifiedLstingData));
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function* getListingWatcher() {
  yield takeLatest(getListingActions.REQUEST, getListingRequest);
  yield takeLatest(socketGetListingActions.HANDLE_EVENT, handleSocketEvent);
}

export default getListingWatcher;
