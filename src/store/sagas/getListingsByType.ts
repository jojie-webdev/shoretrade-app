import { lensPath, pathOr, set, view } from 'ramda';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getListingsByType } from 'services/listing';
import { AsyncAction, Action } from 'types/Action';
import {
  GetListingsByTypeMeta,
  GetListingsByTypePayload,
  GetListingsByTypeResponseListingItem,
} from 'types/store/GetListingsByTypeState';
import { Store } from 'types/store/Store';
import { findProduct } from 'utils/Listing';

import { getListingsByTypeActions, socketActions } from '../actions';

function* getListingsByTypeRequest(
  action: AsyncAction<GetListingsByTypeMeta, GetListingsByTypePayload>
) {
  const state: Store = yield select();
  if (state.auth.token && state.currentAddress.id) {
    try {
      const { data } = yield call(
        getListingsByType,
        { typeId: action.meta.typeId, addressId: state.currentAddress.id },
        { ...action.meta.filterData },
        state.auth.token
      );
      yield put(getListingsByTypeActions.success(data));
    } catch (e) {
      yield put(getListingsByTypeActions.failed(e.message));
    }
  } else {
    yield put(getListingsByTypeActions.failed('Token not found'));
  }
}

function* getListingByTypePatchRemaining(action: Action<any>) {
  const state: Store = yield select();
  const getListingByTypeData = state.getListingsByType.data;
  if (getListingByTypeData) {
    const listingsLens = lensPath(['data', 'listings']);
    const listings: GetListingsByTypeResponseListingItem[] = view(
      listingsLens,
      getListingByTypeData
    );
    const realtimeRemaining: {
      id?: string;
      remaining?: number;
    } = pathOr({}, ['payload'], action);

    if (typeof realtimeRemaining === 'object' && realtimeRemaining.id) {
      const modifiedListings = listings.map((a) => {
        if (a.id === realtimeRemaining.id) {
          return {
            ...a,
            remaining: realtimeRemaining.remaining,
          };
        }
        return a;
      });

      const modifiedGetListingData: GetListingsByTypePayload = set(
        listingsLens,
        modifiedListings,
        getListingByTypeData
      );

      yield put(getListingsByTypeActions.patch(modifiedGetListingData));
    }
  }
}

function* getListingByTypePatchUpdate(action: Action<any>) {
  const state: Store = yield select();
  const getListingByTypeData = state.getListingsByType.data;
  if (getListingByTypeData) {
    const listingsLens = lensPath(['data', 'listings']);
    const listings: GetListingsByTypeResponseListingItem[] = view(
      listingsLens,
      getListingByTypeData
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
      const modifiedListings = listings.map((a) => {
        if (a.id === realtimeData.id) {
          return {
            ...a,
            remaining: realtimeData.remaining,
            price: realtimeData.price,
            minimumOrder: realtimeData.minimumOrder,
          };
        }
        return a;
      });

      const modifiedGetListingData: GetListingsByTypePayload = set(
        listingsLens,
        modifiedListings,
        getListingByTypeData
      );

      yield put(getListingsByTypeActions.patch(modifiedGetListingData));
    }
  }
}

function* getListingsByTypeWatcher() {
  yield takeLatest(getListingsByTypeActions.REQUEST, getListingsByTypeRequest);
  yield takeLatest(
    socketActions.UPDATE_REMAINING_BOXES,
    getListingByTypePatchRemaining
  );
  yield takeLatest(socketActions.UPDATE_LISTING, getListingByTypePatchUpdate);
}

export default getListingsByTypeWatcher;
