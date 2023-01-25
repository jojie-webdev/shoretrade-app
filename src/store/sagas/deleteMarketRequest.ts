import { push } from 'connected-react-router';
import { BUYER_ROUTES } from 'consts';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { deleteRequest } from 'services/marketRequest';
import { AsyncAction } from 'types/Action';
import {
  DeleteMarketRequestMeta,
  DeleteMarketRequestPayload,
} from 'types/store/DeleteMarketRequestState';
import { Store } from 'types/store/Store';

import { deleteMarketRequestActions } from '../actions';

function* deleteMarketRequestRequest(
  action: AsyncAction<DeleteMarketRequestMeta, DeleteMarketRequestPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(deleteRequest, action.meta, state.auth.token);
      yield put(deleteMarketRequestActions.success(data));
    } catch (e) {
      yield put(deleteMarketRequestActions.failed(e.message));
    }
  } else {
    yield put(deleteMarketRequestActions.failed('Token not found'));
  }
}

function* deleteMarketRequestSuccess(
  action: AsyncAction<DeleteMarketRequestMeta, DeleteMarketRequestPayload>
) {
  yield put(push(BUYER_ROUTES.NEGOTIATIONS_AND_REQUESTS));
}

function* deleteMarketRequestWatcher() {
  yield takeLatest(
    deleteMarketRequestActions.REQUEST,
    deleteMarketRequestRequest
  );
  yield takeLatest(
    deleteMarketRequestActions.SUCCESS,
    deleteMarketRequestSuccess
  );
}

export default deleteMarketRequestWatcher;
