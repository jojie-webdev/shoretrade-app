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
      const homePageDataLens = lensPath(['data', 'data']);
      const homePageData: {
        recentListing: GetBuyerHomepageResponseListingItem[];
        favouriteListing: GetBuyerHomepageResponseListingItem[];
      } = view(homePageDataLens, homeState);
      let modifiedRecentListings: GetBuyerHomepageResponseListingItem[] = [];
      let modifiedFavouriteListings: GetBuyerHomepageResponseListingItem[] = [];

      idx = homePageData.recentListing.findIndex((i) =>
        findProduct(i, realtimeRemaining.id)
      );

      if (idx !== -1) {
        if (realtimeRemaining.remaining !== 0) {
          modifiedRecentListings = homePageData.recentListing.map((i) => {
            if (i.id === realtimeRemaining.id) {
              return {
                ...i,
                remaining: realtimeRemaining.remaining,
              };
            }
            return i;
          });
        } else if (realtimeRemaining.remaining === 0) {
          modifiedRecentListings = homePageData.recentListing.filter(
            (i) => i.id !== realtimeRemaining.id
          );
        }
      }

      idx = homePageData.favouriteListing.findIndex((i) =>
        findProduct(i, realtimeRemaining.id)
      );

      if (idx !== -1) {
        if (realtimeRemaining.remaining !== 0) {
          modifiedFavouriteListings = homePageData.favouriteListing.map((i) => {
            if (i.id === realtimeRemaining.id) {
              return {
                ...i,
                remaining: realtimeRemaining.remaining,
              };
            }
            return i;
          });
        } else if (realtimeRemaining.remaining === 0) {
          modifiedFavouriteListings = homePageData.favouriteListing.filter(
            (i) => i.id !== realtimeRemaining.id
          );
        }
      }

      const modifiedListings = {
        ...homePageData,
        recentListing: modifiedRecentListings,
        favouriteListing: modifiedFavouriteListings,
      };

      const modifiedHomePageData: GetBuyerHomepagePayload = set(
        homePageDataLens,
        modifiedListings,
        homeState
      );

      yield put(getBuyerHomepageActions.success(modifiedHomePageData));
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
