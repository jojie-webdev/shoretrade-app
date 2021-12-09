import { lensPath, pathOr, set, view } from 'ramda';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getListing } from 'services/listing';
import { AsyncAction, Action } from 'types/Action';
import { GetListingMeta, GetListingPayload } from 'types/store/GetListingState';
import { Store } from 'types/store/Store';

import { getListingActions, socketActions } from '../actions';

function* getListingRequest(
  action: AsyncAction<GetListingMeta, GetListingPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(getListing, action.meta, state.auth.token);
      yield put(getListingActions.success(data));
    } catch (e) {
      yield put(getListingActions.failed(e.message));
    }
  } else {
    yield put(getListingActions.failed('Token not found'));
  }
}

function* getListingPatchRemaining(action: Action<any>) {
  const state: Store = yield select();
  const getListingData = state.getListing.data;
  if (getListingData) {
    const idLens = lensPath(['data', 'listing', '0', 'id']);
    const currentListingId: string = view(idLens, getListingData);
    const realtimeRemaining: {
      id?: string;
      remaining?: number;
    } = pathOr({}, ['payload'], action);

    if (
      typeof realtimeRemaining === 'object' &&
      realtimeRemaining.id &&
      currentListingId === realtimeRemaining.id
    ) {
      const remainingLens = lensPath(['data', 'listing', '0', 'remaining']);

      const modifiedGetListingData: GetListingPayload = set(
        remainingLens,
        realtimeRemaining.remaining,
        getListingData
      );

      yield put(getListingActions.patch(modifiedGetListingData));
    }
  }
}

function* getListingPatchUpdate(action: Action<any>) {
  const state: Store = yield select();
  const getListingData = state.getListing.data;
  if (getListingData) {
    const idLens = lensPath(['data', 'listing', '0', 'id']);
    const currentListingId: string = view(idLens, getListingData);
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

    if (
      typeof realtimeData === 'object' &&
      realtimeData.id &&
      currentListingId === realtimeData.id
    ) {
      const modifiedGetListingData = [
        'remaining',
        'price',
        'minimumOrder',
      ].reduce((accum: GetListingPayload, key): GetListingPayload => {
        const keyLens = lensPath(['data', 'listing', '0', key]);
        // @ts-ignore
        // key is guaranteed to be a property of realtimeData
        const replacementData = realtimeData[key];
        return set(keyLens, replacementData, accum);
      }, getListingData);

      yield put(getListingActions.patch(modifiedGetListingData));
    }
  }
}

function* getListingWatcher() {
  yield takeLatest(getListingActions.REQUEST, getListingRequest);
  yield takeLatest(
    socketActions.UPDATE_REMAINING_BOXES,
    getListingPatchRemaining
  );
  yield takeLatest(socketActions.UPDATE_LISTING, getListingPatchUpdate);
}

export default getListingWatcher;
