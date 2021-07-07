import { lensPath, pathOr, set, view } from 'ramda';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getAllListings } from 'services/listing';
import socketGetAllListingsAction from 'store/actions/socketGetAllListings';
import { AsyncAction, SocketAction } from 'types/Action';
import {
  GetAllListingsMeta,
  GetAllListingsPayload,
  GetAllListingsResponseItem,
} from 'types/store/GetAllListingsState';
import {
  SocketGetAllListingsMeta,
  SocketGetAllListingsPayload,
} from 'types/store/socketGetAllListingsState';
import { Store } from 'types/store/Store';
import { findProduct } from 'utils/Listing';

import { getAllListingsActions } from '../actions';

function* getAllListingsRequest(
  action: AsyncAction<GetAllListingsMeta, GetAllListingsPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(getAllListings, state.auth.token);
      yield put(getAllListingsActions.success(data));
    } catch (e) {
      yield put(getAllListingsActions.failed(e.message));
    }
  } else {
    yield put(getAllListingsActions.failed('Token not found'));
  }
}

function* handleSocketEvent(
  action: SocketAction<SocketGetAllListingsMeta, SocketGetAllListingsPayload>
) {
  const state: Store = yield select();
  const allListingState = state.getAllListings.data;
  const allListingData = state.getAllListings.data?.data.orders;
  // findindex of id
  const realtimeRemaining: {
    id: string;

    remaining: number;
  } = pathOr({ id: '', remaining: 0 }, ['payload'], action);
  let idx = -1;
  try {
    if (allListingState && allListingState.data) {
      const ordersLens = lensPath(['data', 'orders']);
      const ordersData: GetAllListingsResponseItem[] = view(
        ordersLens,
        allListingState
      );
      let modifiedOrders: GetAllListingsResponseItem[] = [];
      idx = ordersData.findIndex((i) => findProduct(i, realtimeRemaining.id));
      if (idx !== -1) {
        if (realtimeRemaining.remaining !== 0) {
          modifiedOrders = ordersData.map((i) => {
            if (i.id === realtimeRemaining.id) {
              return {
                ...i,
                remaining: realtimeRemaining.remaining,
              };
            }
            return i;
          });
        } else if (realtimeRemaining.remaining === 0) {
          modifiedOrders = ordersData.filter(
            (i) => i.id !== realtimeRemaining.id
          );
        }

        const modifiedAllListing: GetAllListingsPayload = set(
          ordersLens,
          modifiedOrders,
          allListingState
        );
        if (allListingState) {
          yield put(getAllListingsActions.success(modifiedAllListing));
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function* getAllListingsWatcher() {
  yield takeLatest(getAllListingsActions.REQUEST, getAllListingsRequest);
  yield takeLatest(socketGetAllListingsAction.HANDLE_EVENT, handleSocketEvent);
}

export default getAllListingsWatcher;
