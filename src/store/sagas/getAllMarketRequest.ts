import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getAllMarketRequest } from 'services/marketRequest';
import { AsyncAction } from 'types/Action';
import {
  GetAllMarketRequestMeta,
  GetAllMarketRequestPayload,
} from 'types/store/GetAllMarketRequestState';
import { Store } from 'types/store/Store';

import { getAllMarketRequestActions } from '../actions';

function* getAllMarketRequestRequest(
  action: AsyncAction<GetAllMarketRequestMeta, GetAllMarketRequestPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        getAllMarketRequest,
        state.auth.token,
        action.meta.queryParams
      );
      yield put(getAllMarketRequestActions.success(data));
    } catch (e) {
      yield put(getAllMarketRequestActions.failed(e.message));
    }
  } else {
    yield put(getAllMarketRequestActions.failed('Token not found'));
  }
}

function* getAllMarketRequestWatcher() {
  yield takeLatest(
    getAllMarketRequestActions.REQUEST,
    getAllMarketRequestRequest
  );
}

export default getAllMarketRequestWatcher;
