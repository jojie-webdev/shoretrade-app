import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getListingFormData } from 'services/listing';
import { AsyncAction } from 'types/Action';
import {
  GetListingFormDataMeta,
  GetListingFormDataPayload,
} from 'types/store/GetListingFormDataState';
import { Store } from 'types/store/Store';

import { getListingFormDataActions, getAllListingsActions } from '../actions';

function* getListingFormDataRequest(
  action: AsyncAction<GetListingFormDataMeta, GetListingFormDataPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getListingFormData,
        action.meta,
        state.auth.token
      );
      yield put(
        getListingFormDataActions.success({
          ...data,
          data: {
            ...data.data,
            currentListingId: action.meta.currentListingId,
            currentHistoricalListingId: action.meta.currentHistoricalListingId,
          },
        })
      );
    } catch (e) {
      yield put(getListingFormDataActions.failed(e.message));
    }
  } else {
    yield put(getListingFormDataActions.failed('Token not found'));
  }
}

function* getListingFormDataWatcher() {
  yield takeLatest(
    getListingFormDataActions.REQUEST,
    getListingFormDataRequest
  );
}

export default getListingFormDataWatcher;
