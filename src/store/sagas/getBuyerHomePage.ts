import { lensPath, pathOr, set, view } from 'ramda';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getBuyerHomepage } from 'services/company';
import { AsyncAction, SocketAction } from 'types/Action';
import {
  GetBuyerHomepageMeta,
  GetBuyerHomepagePayload,
  GetBuyerHomepageResponseListingItem,
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
  // findindex of id
  const realtimeRemaining: {
    id: string;

    remaining: number;
  } = pathOr({ id: '', remaining: 0 }, ['payload'], action);

  let idx = -1;
  try {
    if (homeState && homeState.data.data.recentListing) {
      const recentListingLens = lensPath(['data', 'data', 'recentListing']);
      const recentListings: GetBuyerHomepageResponseListingItem[] = view(
        recentListingLens,
        homeState
      );
      let modifiedRecentListings: GetBuyerHomepageResponseListingItem[] = [];
      idx = recentListings.findIndex((i) =>
        findProduct(i, realtimeRemaining.id)
      );
      if (idx !== -1) {
        if (realtimeRemaining.remaining !== 0) {
          modifiedRecentListings = recentListings.map((i) => {
            if (i.id === realtimeRemaining.id) {
              return {
                ...i,
                remaining: realtimeRemaining.remaining,
              };
            }
            return i;
          });
        } else if (realtimeRemaining.remaining === 0) {
          modifiedRecentListings = recentListings.filter(
            (i) => i.id !== realtimeRemaining.id
          );
        }
      }
      const modifiedHomePageData: GetBuyerHomepagePayload = set(
        recentListingLens,
        modifiedRecentListings,
        homeState
      );

      yield put(getBuyerHomepageActions.success(modifiedHomePageData));
    }

    // if (homeData?.favouriteListing) {
    //   idx = homeData.favouriteListing.findIndex((i) =>
    //     findProduct(i, realtimeRemaining.id)
    //   );
    //   if (idx !== -1) {
    //     if (realtimeRemaining.remaining === 0) {
    //       homeData.favouriteListing.splice(idx, 1);
    //     } else {
    //       // homeData.favouriteListing[idx].remaining = remaining;
    //     }
    //   }
    // }
    // if (homeData && homeState) {
    //   homeState.data.data = homeData;
    //   yield put(getBuyerHomepageActions.success(homeState));
    // }
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
