import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getAllSellerOrders } from 'services/orders';
import { AsyncAction } from 'types/Action';
import {
  GetAllSellerOrdersMeta,
  GetAllSellerOrdersPayload,
} from 'types/store/GetAllSellerOrdersState';
import { Store } from 'types/store/Store';

import {
  getAllSellerOrdersActions,
  getSellerOrdersPendingActions,
  getSellerOrdersPlacedActions,
  getSellerOrdersTransitActions,
  getSellerOrdersDeliveredActions,
} from '../actions';

function* getAllSellerOrdersActionsRequest(
  action: AsyncAction<GetAllSellerOrdersMeta, GetAllSellerOrdersPayload>
) {
  yield put(getSellerOrdersPendingActions.request());
  yield put(getSellerOrdersPlacedActions.request());
  yield put(getSellerOrdersTransitActions.request());
  yield put(getSellerOrdersDeliveredActions.request());
}

const createGetAllSellerOrdersRequest = (
  actionCreator: typeof getAllSellerOrdersActions
) => {
  return function* request(
    action: AsyncAction<GetAllSellerOrdersMeta, GetAllSellerOrdersPayload>
  ) {
    const state: Store = yield select();
    if (state.auth.token) {
      try {
        const { data } = yield call(
          getAllSellerOrders,
          action.meta,
          state.auth.token
        );
        yield put(actionCreator.success(data));
      } catch (e) {
        yield put(actionCreator.failed(e.message));
      }
    } else {
      yield put(actionCreator.failed('Token not found'));
    }
  };
};

function* getAllSellerOrdersWatcher() {
  yield takeLatest(
    getAllSellerOrdersActions.REQUEST,
    getAllSellerOrdersActionsRequest
  );
  yield takeLatest(
    getSellerOrdersPendingActions.REQUEST,
    createGetAllSellerOrdersRequest(getSellerOrdersPendingActions)
  );
  yield takeLatest(
    getSellerOrdersPlacedActions.REQUEST,
    createGetAllSellerOrdersRequest(getSellerOrdersPlacedActions)
  );
  yield takeLatest(
    getSellerOrdersTransitActions.REQUEST,
    createGetAllSellerOrdersRequest(getSellerOrdersTransitActions)
  );
  yield takeLatest(
    getSellerOrdersDeliveredActions.REQUEST,
    createGetAllSellerOrdersRequest(getSellerOrdersDeliveredActions)
  );
}

export default getAllSellerOrdersWatcher;
