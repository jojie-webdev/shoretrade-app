import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getBuyerSearchFilterData } from 'services/listing';
import { AsyncAction } from 'types/Action';
import {
  GetBuyerSearchFilterDataMeta,
  GetBuyerSearchFilterDataPayload,
} from 'types/store/GetBuyerSearchFilterDataState';
import { Store } from 'types/store/Store';

import { getBuyerSearchFilterDataActions } from '../actions';

function* getBuyerSearchFilterDataRequest(
  action: AsyncAction<
    GetBuyerSearchFilterDataMeta,
    GetBuyerSearchFilterDataPayload
  >
) {
  const state: Store = yield select();
  if (state.auth.token && state.currentAddress.id) {
    try {
      const { data } = yield call(
        getBuyerSearchFilterData,
        { typeId: action.meta.typeId },
        state.auth.token
      );
      yield put(getBuyerSearchFilterDataActions.success(data));
    } catch (e) {
      yield put(getBuyerSearchFilterDataActions.failed(e.message));
    }
  } else {
    yield put(getBuyerSearchFilterDataActions.failed('Token not found'));
  }
}

function* getBuyerSearchFilterDataWatcher() {
  yield takeLatest(
    getBuyerSearchFilterDataActions.REQUEST,
    getBuyerSearchFilterDataRequest
  );
}

export default getBuyerSearchFilterDataWatcher;
