import {
  lensPath,
  pathOr,
  set,
  view,
  find,
  propEq,
  map,
  filter,
  compose,
  pick,
} from 'ramda';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getBuyerHomepage } from 'services/company';
import { AsyncAction, Action } from 'types/Action';
import {
  GetBuyerHomepagePayload,
  GetBuyerHomepageResponseListingItem,
} from 'types/store/GetBuyerHomepageState';
import { Store } from 'types/store/Store';

import { getBuyerHomepageActions, socketActions } from '../actions';

type GetBuyerHomePageActionRequest = { id: string; remaining: number };
type GetBuyerHomePageAction = Action<GetBuyerHomePageActionRequest>;

function* getBuyerHomepageRequest(_action: never) {
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
      if (error instanceof Error) {
        yield put(getBuyerHomepageActions.failed(error.message));
      }
    }
  } else {
    yield put(getBuyerHomepageActions.failed('Token not found.'));
  }
}

function* getBuyerHomepagePatchRemaining(action: GetBuyerHomePageAction) {
  const state: Store = yield select();

  const { data: buyerHomepageData } = state.getBuyerHomepage;

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

    const realtimeRemaining: GetBuyerHomePageActionRequest = pick(['payload'])(
      action
    ).payload;

    const getAvailableItems = compose(
      filter((item: GetBuyerHomepageResponseListingItem) => !!item.remaining),
      map((item: GetBuyerHomepageResponseListingItem) =>
        item.id === realtimeRemaining.id
          ? { ...item, remaining: realtimeRemaining.remaining }
          : item
      )
    );

    if (typeof realtimeRemaining === 'object' && realtimeRemaining.id) {
      const modifiedRecentListings = getAvailableItems(recentListings);
      const modifiedFavouriteListings = getAvailableItems(favouriteListings);

      const outOfStockItems = recentListings
        .map((recentItem) =>
          recentItem.id === realtimeRemaining.id
            ? {
                ...recentItem,
                remaining: realtimeRemaining.remaining,
                previousRemaining: recentItem.remaining,
              }
            : recentItem
        )
        .filter((recentItem) => !recentItem.remaining);

      if (outOfStockItems.length) {
        outOfStockItems.forEach((item) => {
          localStorage.setItem(
            item.id,
            JSON.stringify({
              ...item,
              isFavourite: !!find(propEq('id', realtimeRemaining.id))(
                favouriteListings
              ),
            })
          );
        });
      }

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

      const isBuyerCategories = pathname.includes('buyer/categories');
      if (
        isBuyerCategories ||
        recentListings.findIndex((item) => item.id === realtimeRemaining.id) ===
          -1
      ) {
        const stringifiedSoftlyRemovedItem = localStorage.getItem(
          realtimeRemaining.id
        );

        if (stringifiedSoftlyRemovedItem) {
          const softlyRemovedItem = JSON.parse(stringifiedSoftlyRemovedItem);

          modifiedBuyerHomepageData = set(
            recentListingLens,
            [
              {
                ...softlyRemovedItem,
                remaining: realtimeRemaining.remaining,
              },
              ...modifiedRecentListings,
            ].sort(
              (a, b) =>
                new Date(b.createdAt).valueOf() -
                new Date(a.createdAt).valueOf()
            ),
            modifiedBuyerHomepageData
          );

          if (softlyRemovedItem.isFavourite) {
            modifiedBuyerHomepageData = set(
              favouriteListingLens,
              [
                {
                  ...softlyRemovedItem,
                  remaining: realtimeRemaining.remaining,
                },
                ...modifiedFavouriteListings,
              ].sort(
                (a, b) =>
                  new Date(b.createdAt).valueOf() -
                  new Date(a.createdAt).valueOf()
              ),
              modifiedBuyerHomepageData
            );
          }

          yield put(getBuyerHomepageActions.patch(modifiedBuyerHomepageData));

          localStorage.removeItem(realtimeRemaining.id);
        }
      }
    }
  }
}

function* getBuyerHomepagePatchUpdate(action: Action<GetBuyerHomepagePayload>) {
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
        yield put(getBuyerHomepageActions.patch(modifiedBuyerHomepageData));
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
