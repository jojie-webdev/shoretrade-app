import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getBuyerHomepage } from 'services/company';
import { AsyncAction, SocketAction } from 'types/Action';
import {
  GetBuyerHomepageMeta,
  GetBuyerHomepagePayload,
} from 'types/store/GetBuyerHomepageState';
import {
  SocketHomePageMeta,
  SocketHomePagePayload,
} from 'types/store/socketHomePageState';
import { Store } from 'types/store/Store';
import { findProduct } from 'utils/Listing';

import { getBuyerHomepageActions, socketHomePageActions } from '../actions';

function* getBuyerHomepageRequest(
  action: AsyncAction<GetBuyerHomepageMeta, GetBuyerHomepagePayload>
) {
  const state: Store = yield select();
  if (state.auth.token && state.currentAddress.id) {
    try {
      const { data } = yield call(
        getBuyerHomepage,
        { addressId: state.currentAddress.id },
        state.auth.token
      );
      yield put(getBuyerHomepageActions.success(data));
    } catch (error) {
      yield put(getBuyerHomepageActions.failed(error.message));
    }
  } else {
    yield put(getBuyerHomepageActions.failed('Token not found.'));
  }
}

function* handleSocketEvent(
  action: SocketAction<SocketHomePageMeta, SocketHomePagePayload>
) {
  const state: Store = yield select();
  const homeState = state.getBuyerHomepage.data;
  const homeData = state.getBuyerHomepage.data?.data.data;
  // findindex of id
  const { id, remaining } = action.payload;
  let idx = -1;
  try {
    if (homeData?.recentListing && idx == -1) {
      idx = homeData.recentListing.findIndex((i) => findProduct(i, id));
      if (idx !== -1) {
        if (remaining === 0) {
          homeData.recentListing.splice(idx, 1);
        } else {
          homeData.recentListing[idx].remaining = remaining;
        }
        if (homeState) {
          homeState.data.data = homeData;
          console.log(homeState);
          yield put(getBuyerHomepageActions.success(homeState));
        }
      }
    }

    if (homeData?.favouriteListing && idx == -1) {
      idx = homeData.favouriteListing.findIndex((i) => findProduct(i, id));
      if (idx !== -1) {
        if (remaining === 0) {
          homeData.favouriteListing.splice(idx, 1);
        } else {
          homeData.favouriteListing[idx].remaining = remaining;
        }
        if (homeState) {
          homeState.data.data = homeData;
          yield put(getBuyerHomepageActions.success(homeState));
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
  // check each array in buyer homepage
}

function* getBuyerHomepageWatcher() {
  yield takeLatest(getBuyerHomepageActions.REQUEST, getBuyerHomepageRequest);
  yield takeLatest(socketHomePageActions.HANDLE_EVENT, handleSocketEvent);
}

export default getBuyerHomepageWatcher;
