import { lensPath, pathOr, set, view } from 'ramda';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getBuyerHomepage } from 'services/company';
import { AsyncAction, Action } from 'types/Action';
import {
  GetBuyerHomepageMeta,
  GetBuyerHomepagePayload,
  GetBuyerHomepageResponseListingItem,
} from 'types/store/GetBuyerHomepageState';
import { Store } from 'types/store/Store';

import { getBuyerHomepageActions, socketActions } from '../actions';

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

function* getBuyerHomepagePatchRemaining(action: Action<any>) {
  const state: Store = yield select();
  const buyerHomepageData = state.getBuyerHomepage.data;
  if (buyerHomepageData) {
    const recentListingLens = lensPath(['data', 'data', 'recentListing']);
    const recentListings: GetBuyerHomepageResponseListingItem[] = view(
      recentListingLens,
      buyerHomepageData
    );

    const favouriteListingLens = lensPath(['data', 'data', 'favouriteListing']);
    const favouriteListings: GetBuyerHomepageResponseListingItem[] = view(
      favouriteListingLens,
      buyerHomepageData
    );

    const realtimeRemaining: {
      id?: string;
      remaining?: number;
    } = pathOr({}, ['payload'], action);

    if (typeof realtimeRemaining === 'object' && realtimeRemaining.id) {
      const modifiedRecentListings = recentListings
        .map((a) => {
          if (a.id === realtimeRemaining.id) {
            return {
              ...a,
              remaining: realtimeRemaining.remaining,
            };
          }
          return a;
        })
        .filter((a) => (a.remaining || 0) > 0);

      const modifiedFavouriteListings = favouriteListings
        .map((a) => {
          if (a.id === realtimeRemaining.id) {
            return {
              ...a,
              remaining: realtimeRemaining.remaining,
            };
          }
          return a;
        })
        .filter((a) => (a.remaining || 0) > 0);

      let modifiedBuyerHomepageData: GetBuyerHomepagePayload = set(
        recentListingLens,
        modifiedRecentListings,
        buyerHomepageData
      );

      modifiedBuyerHomepageData = set(
        favouriteListingLens,
        modifiedFavouriteListings,
        modifiedBuyerHomepageData
      );

      yield put(getBuyerHomepageActions.patch(modifiedBuyerHomepageData));

      const pathname: string = yield select(
        (state: Store) => state.router.location.pathname
      );

      // if in categories screen or if recent listings does not include
      //  target listing (ex. sold out via cart)
      // manually refresh the whole buyer home page
      const isBuyerCategories = pathname.includes('buyer/categories');
      if (
        isBuyerCategories ||
        recentListings.findIndex((a) => a.id === realtimeRemaining.id) === -1
      ) {
        yield put(getBuyerHomepageActions.request());
      }
    }
  }
}

function* getBuyerHomepagePatchUpdate(action: Action<any>) {
  const state: Store = yield select();
  const buyerHomepageData = state.getBuyerHomepage.data;
  if (buyerHomepageData) {
    const recentListingLens = lensPath(['data', 'data', 'recentListing']);
    const recentListings: GetBuyerHomepageResponseListingItem[] = view(
      recentListingLens,
      buyerHomepageData
    );

    const favouriteListingLens = lensPath(['data', 'data', 'favouriteListing']);
    const favouriteListings: GetBuyerHomepageResponseListingItem[] = view(
      favouriteListingLens,
      buyerHomepageData
    );

    const realtimeData: {
      id?: string;
      remaining?: number;
      price?: string;
      minimumOrder?: string;
      boxes?: {
        count: number;
        id: string;
        quantity: number;
        weight: number;
      }[];
    } = pathOr({}, ['payload'], action);

    if (typeof realtimeData === 'object' && realtimeData.id) {
      const modifiedRecentListings = recentListings
        .map((a) => {
          if (a.id === realtimeData.id) {
            return {
              ...a,
              remaining: realtimeData.remaining,
              price: realtimeData.price,
              minimumOrder: realtimeData.minimumOrder,
            };
          }
          return a;
        })
        .filter((a) => (a.remaining || 0) > 0);

      const modifiedFavouriteListings = favouriteListings
        .map((a) => {
          if (a.id === realtimeData.id) {
            return {
              ...a,
              remaining: realtimeData.remaining,
              price: realtimeData.price,
              minimumOrder: realtimeData.minimumOrder,
            };
          }
          return a;
        })
        .filter((a) => (a.remaining || 0) > 0);

      let modifiedBuyerHomepageData: GetBuyerHomepagePayload = set(
        recentListingLens,
        modifiedRecentListings,
        buyerHomepageData
      );

      modifiedBuyerHomepageData = set(
        favouriteListingLens,
        modifiedFavouriteListings,
        modifiedBuyerHomepageData
      );

      yield put(getBuyerHomepageActions.patch(modifiedBuyerHomepageData));

      const pathname: string = yield select(
        (state: Store) => state.router.location.pathname
      );

      // if in categories screen or if recent listings does not include
      //  target listing (ex. sold out via cart)
      // manually refresh the whole buyer home page
      const isBuyerCategories = pathname.includes('buyer/categories');
      if (
        isBuyerCategories ||
        recentListings.findIndex((a) => a.id === realtimeData.id) === -1
      ) {
        yield put(getBuyerHomepageActions.request());
      }
    }
  }
}

function* getBuyerHomepageWatcher() {
  yield takeLatest(getBuyerHomepageActions.REQUEST, getBuyerHomepageRequest);
  yield takeLatest(
    socketActions.UPDATE_REMAINING_BOXES,
    getBuyerHomepagePatchRemaining
  );
  yield takeLatest(socketActions.UPDATE_LISTING, getBuyerHomepagePatchUpdate);
}

export default getBuyerHomepageWatcher;
