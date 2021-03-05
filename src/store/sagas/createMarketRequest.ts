import { push } from 'connected-react-router';
import { BUYER_ROUTES } from 'consts';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { createMarketRequest } from 'services/marketRequest';
// import editableMarketRequest from 'store/reducers/editableMarketRequest';
import { AsyncAction } from 'types/Action';
import {
  EditableMarketRequestState,
  EditableMarketRequestPayload,
} from 'types/store/EditableMarketRequest';
import { Store } from 'types/store/Store';

import {
  createMarketRequestActions,
  getAllMarketRequestActions,
  editableMarketRequestActions,
} from '../actions';

function* createMarketRequestDatabase(
  action: AsyncAction<EditableMarketRequestState, EditableMarketRequestPayload>
) {
  const state: Store = yield select();
  if (state.auth.token) {
    try {
      const { data } = yield call(
        createMarketRequest,
        action.meta,
        state.auth.token
      );
      yield put(createMarketRequestActions.success(data));
    } catch (e) {
      yield put(createMarketRequestActions.failed(e.message));
    }
  } else {
    yield put(createMarketRequestActions.failed('Token not found'));
  }
}

function* createMarketRequestSuccess(
  action: AsyncAction<EditableMarketRequestState, EditableMarketRequestPayload>
) {
  yield put(editableMarketRequestActions.clear());
  yield put(push(BUYER_ROUTES.MARKET_REQUESTS));
}

function* createMarketRequestWatcher() {
  yield takeLatest(
    createMarketRequestActions.REQUEST,
    createMarketRequestDatabase
  );
  yield takeLatest(
    createMarketRequestActions.SUCCESS,
    createMarketRequestSuccess
  );
}

export default createMarketRequestWatcher;
