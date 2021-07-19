import { lensPath, pathOr, set, view } from 'ramda';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getAllBuyerListings } from 'services/listing';
import socketGetAllListingsAction from 'store/actions/socketGetAllListings';
import { SocketAction } from 'types/Action';
import {
  GetAllBuyerListingResponseItem,
  GetAllBuyerListingsPayload,
} from 'types/store/GetAllBuyerListingsState';
import {
  SocketGetAllListingsMeta,
  SocketGetAllListingsPayload,
} from 'types/store/socketGetAllListingsState';
// import { AsyncAction } from 'types/Action';
// import {
//   GetAllBuyerListingsMeta,
//   GetAllBuyerListingsPayload,
// } from 'types/store/GetAllBuyerListingsState';
import { Store } from 'types/store/Store';
import { downloadCsv } from 'utils/downloadCsv';
import { findProduct } from 'utils/Listing';

import { getAllBuyerListingsActions } from '../actions';

function* getAllBuyerListingsRequest(action: any) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(getAllBuyerListings, state.auth.token, {
        sortBy: action.payload?.sortField,
        term: action.payload?.searchTerm,
        page: action.payload?.page,
        limit: action.payload?.limit,
        sortOrder: action.payload?.sortOrder,
      });
      yield put(getAllBuyerListingsActions.success(data));
    } catch (e) {
      yield put(getAllBuyerListingsActions.failed(e.message));
    }
  } else {
    yield put(getAllBuyerListingsActions.failed('Token not found'));
  }
}

function* getAllBuyerListingsCSV(action: any) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(getAllBuyerListings, state.auth.token, {
        sortBy: action.payload?.sortField,
        term: action.payload?.searchTerm,
        csv: action.payload?.csv,
        page: action.payload?.page,
        limit: action.payload?.limit,
        sortOrder: action.payload?.sortOrder,
        ids: action.payload?.ids,
        all: action.payload?.all,
      });
      downloadCsv(data, `All listing.csv`);
      yield put(getAllBuyerListingsActions.requestCsvSuccess());
    } catch (e) {
      yield put(getAllBuyerListingsActions.failed(e.message));
    }
  } else {
    yield put(getAllBuyerListingsActions.failed('Token not found'));
  }
}

function* handleSocketEvent(
  action: SocketAction<SocketGetAllListingsMeta, SocketGetAllListingsPayload>
) {
  const state: Store = yield select();
  const allListingState = state.getAllBuyerListings.data;
  const realtimeRemaining: {
    id: string;

    remaining: number;
  } = pathOr({ id: '', remaining: 0 }, ['payload'], action);
  let idx = -1;

  console.log(allListingState);
  try {
    if (allListingState && allListingState.data) {
      const ordersLens = lensPath(['data', 'listings']);
      const ordersData: GetAllBuyerListingResponseItem[] = view(
        ordersLens,
        allListingState
      );
      let modifiedOrders: GetAllBuyerListingResponseItem[] = [];
      idx = ordersData.findIndex((i) => findProduct(i, realtimeRemaining.id));
      if (idx !== -1) {
        if (realtimeRemaining.remaining !== 0) {
          modifiedOrders = ordersData.map((i) => {
            if (i.id === realtimeRemaining.id) {
              return {
                ...i,
                remaining_weight: realtimeRemaining.remaining,
              };
            }
            return i;
          });
        } else if (realtimeRemaining.remaining === 0) {
          modifiedOrders = ordersData.filter(
            (i) => i.id !== realtimeRemaining.id
          );
        }

        const modifiedAllListing: GetAllBuyerListingsPayload = set(
          ordersLens,
          modifiedOrders,
          allListingState
        );
        if (allListingState) {
          yield put(getAllBuyerListingsActions.success(modifiedAllListing));
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function* getAllBuyerListingsWatcher() {
  yield takeLatest(
    getAllBuyerListingsActions.REQUEST,
    getAllBuyerListingsRequest
  );
  yield takeLatest(
    `${getAllBuyerListingsActions.REQUEST}/CSV`,
    getAllBuyerListingsCSV
  );
  yield takeLatest(socketGetAllListingsAction.HANDLE_EVENT, handleSocketEvent);
}

export default getAllBuyerListingsWatcher;
