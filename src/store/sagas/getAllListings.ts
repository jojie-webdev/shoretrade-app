import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getAllListings } from 'services/listing';
import socketGetAllListingsAction from 'store/actions/socketGetAllListings';
import { AsyncAction, SocketAction } from 'types/Action';
import {
  GetAllListingsMeta,
  GetAllListingsPayload,
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
  const { id, remaining } = action.payload;
  let idx = -1;
  try {
    if (allListingData && idx == -1) {
      idx = allListingData.findIndex((i) => findProduct(i, id));
      if (idx !== -1) {
        if (remaining === 0) {
          allListingData.splice(idx, 1);
        } else {
          allListingData[idx].remaining = remaining;
        }
        if (allListingState) {
          allListingState.data.orders = allListingData;
          yield put(getAllListingsActions.success(allListingState));
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
  // check each array in buyer homepage
}

function* getAllListingsWatcher() {
  yield takeLatest(getAllListingsActions.REQUEST, getAllListingsRequest);
  yield takeLatest(socketGetAllListingsAction.HANDLE_EVENT, handleSocketEvent);
}

export default getAllListingsWatcher;
