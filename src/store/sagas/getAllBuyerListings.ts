import { SALES_CHANNELS_BUYER } from 'consts/salesChannels';
import { lensPath, pathOr, set, view } from 'ramda';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getAllBuyerListings } from 'services/listing';
import { Action } from 'types/Action';
import {
  GetAllBuyerListingResponseItem,
  GetAllBuyerListingsPayload,
} from 'types/store/GetAllBuyerListingsState';
import { Store } from 'types/store/Store';
import { downloadCsv } from 'utils/downloadCsv';
import { findProduct } from 'utils/Listing';

import { getAllBuyerListingsActions, socketActions } from '../actions';

function* getAllBuyerListingsRequest(action: any) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(getAllBuyerListings, state.auth.token, {
        salesChannel: action.payload?.salesChannel,
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
      const salesChannel = action.payload?.salesChannel;
      const { data } = yield call(getAllBuyerListings, state.auth.token, {
        salesChannel,
        sortBy: action.payload?.sortField,
        term: action.payload?.searchTerm,
        csv: action.payload?.csv,
        sortOrder: action.payload?.sortOrder,
        ids: action.payload?.ids,
        all: action.payload?.all,
        exceptId: action?.payload?.exceptId,
      });

      const salesChannelLabel = SALES_CHANNELS_BUYER.find(
        (channel) => channel.constant === salesChannel
      )?.label;

      downloadCsv(
        data,
        `All listings${
          salesChannel && salesChannel !== 'ALL'
            ? ` - ${salesChannelLabel}`
            : ''
        }.csv`
      );
      yield put(getAllBuyerListingsActions.requestCsvSuccess());
    } catch (e) {
      yield put(getAllBuyerListingsActions.failed(e.message));
    }
  } else {
    yield put(getAllBuyerListingsActions.failed('Token not found'));
  }
}

function* getAllBuyerListingsPatchRemaining(action: Action<any>) {
  const state: Store = yield select();
  const previousRequest = state.getAllBuyerListings.request;
  const allListingState = state.getAllBuyerListings.data;
  const realtimeRemaining: {
    id: string;
    remaining: number;
  } = pathOr({ id: '', remaining: 0 }, ['payload'], action);
  let idx = -1;

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

          const modifiedAllListing: GetAllBuyerListingsPayload = set(
            ordersLens,
            modifiedOrders,
            allListingState
          );

          yield put(getAllBuyerListingsActions.patch(modifiedAllListing));
        } else if (realtimeRemaining.remaining === 0) {
          yield put(getAllBuyerListingsActions.request(previousRequest));
        }
      } else {
        yield put(getAllBuyerListingsActions.request(previousRequest));
      }
    }
  } catch (err) {
    console.log(err);
  }
}

function* getAllBuyerListingsPatchUpdate(action: Action<any>) {
  const state: Store = yield select();
  const previousRequest = state.getAllBuyerListings.request;
  const allListingState = state.getAllBuyerListings.data;
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
    if (allListingState && allListingState.data) {
      const ordersLens = lensPath(['data', 'listings']);
      const ordersData: GetAllBuyerListingResponseItem[] = view(
        ordersLens,
        allListingState
      );
      let modifiedOrders: GetAllBuyerListingResponseItem[] = [];
      idx = ordersData.findIndex((i) => findProduct(i, realtimeData.id));
      if (idx !== -1) {
        if (realtimeData.remaining !== 0) {
          modifiedOrders = ordersData.map((i) => {
            if (i.id === realtimeData.id) {
              return {
                ...i,
                price: realtimeData.price || i.price,
                remaining_weight: realtimeData.remaining,
              };
            }
            return i;
          });

          const modifiedAllListing: GetAllBuyerListingsPayload = set(
            ordersLens,
            modifiedOrders,
            allListingState
          );

          yield put(getAllBuyerListingsActions.patch(modifiedAllListing));
        } else if (realtimeData.remaining === 0) {
          yield put(getAllBuyerListingsActions.request(previousRequest));
        }
      } else {
        yield put(getAllBuyerListingsActions.request(previousRequest));
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
  yield takeLatest(
    socketActions.UPDATE_REMAINING_BOXES,
    getAllBuyerListingsPatchRemaining
  );
  yield takeLatest(
    socketActions.UPDATE_LISTING,
    getAllBuyerListingsPatchUpdate
  );
}

export default getAllBuyerListingsWatcher;
