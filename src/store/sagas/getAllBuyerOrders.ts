import pathOr from 'ramda/es/pathOr';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getAllBuyerOrders } from 'services/orders';
import { AsyncAction } from 'types/Action';
import {
  GetAllBuyerOrdersMeta,
  GetAllBuyerOrdersPayload,
} from 'types/store/GetAllBuyerOrdersState';
import { Store } from 'types/store/Store';

import {
  getAllBuyerOrdersActions,
  getBuyerOrdersPendingActions,
  getBuyerOrdersPlacedActions,
  getBuyerOrdersTransitActions,
  getBuyerOrdersDeliveredActions,
} from '../actions';

function* getAllBuyerOrdersActionsRequest(
  action: AsyncAction<GetAllBuyerOrdersMeta, GetAllBuyerOrdersPayload>
) {
  yield put(getBuyerOrdersPendingActions.request());
  yield put(getBuyerOrdersPlacedActions.request());
  yield put(getBuyerOrdersTransitActions.request());
  yield put(getBuyerOrdersDeliveredActions.request());
}

const createGetAllBuyerOrdersRequest = (
  actionCreator: typeof getAllBuyerOrdersActions
) => {
  return function* request(
    action: AsyncAction<GetAllBuyerOrdersMeta, GetAllBuyerOrdersPayload>
  ) {
    const state: Store = yield select();
    if (state.auth.token) {
      try {
        const { data } = yield call(
          getAllBuyerOrders,
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

function* getAllBuyerOrdersWatcher() {
  yield takeLatest(
    getAllBuyerOrdersActions.REQUEST,
    getAllBuyerOrdersActionsRequest
  );

  yield takeLatest(
    getBuyerOrdersPendingActions.REQUEST,
    createGetAllBuyerOrdersRequest(getBuyerOrdersPendingActions)
  );
  yield takeLatest(
    getBuyerOrdersPlacedActions.REQUEST,
    createGetAllBuyerOrdersRequest(getBuyerOrdersPlacedActions)
  );
  yield takeLatest(
    getBuyerOrdersTransitActions.REQUEST,
    createGetAllBuyerOrdersRequest(getBuyerOrdersTransitActions)
  );
  yield takeLatest(
    getBuyerOrdersDeliveredActions.REQUEST,
    createGetAllBuyerOrdersRequest(getBuyerOrdersDeliveredActions)
  );
}

export default getAllBuyerOrdersWatcher;
