import { put, call, takeLatest, select } from 'redux-saga/effects';
import { getBuyerOrders } from 'services/orders';
import { AsyncAction } from 'types/Action';
import {
  GetBuyerOrdersMeta,
  GetBuyerOrdersPayload,
} from 'types/store/GetBuyerOrdersState';
import { Store } from 'types/store/Store';

import {
  getBuyerOrdersActions,
  getBuyerOrdersPlacedActions,
  getBuyerOrdersTransitActions,
  getBuyerOrdersDeliveredActions,
} from '../actions';

function* getBuyerOrdersActionsRequest(
  action: AsyncAction<GetBuyerOrdersMeta, GetBuyerOrdersPayload>
) {
  yield put(getBuyerOrdersPlacedActions.request());
  yield put(getBuyerOrdersTransitActions.request());
  yield put(getBuyerOrdersDeliveredActions.request());
}

const createGetBuyerOrdersRequest = (
  actionCreator: typeof getBuyerOrdersActions
) => {
  return function* request(
    action: AsyncAction<GetBuyerOrdersMeta, GetBuyerOrdersPayload>
  ) {
    const state: Store = yield select();
    if (state.auth.token) {
      try {
        const { data } = yield call(
          getBuyerOrders,
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

function* getBuyerOrdersWatcher() {
  yield takeLatest(getBuyerOrdersActions.REQUEST, getBuyerOrdersActionsRequest);
  yield takeLatest(
    getBuyerOrdersPlacedActions.REQUEST,
    createGetBuyerOrdersRequest(getBuyerOrdersPlacedActions)
  );
  yield takeLatest(
    getBuyerOrdersTransitActions.REQUEST,
    createGetBuyerOrdersRequest(getBuyerOrdersTransitActions)
  );
  yield takeLatest(
    getBuyerOrdersDeliveredActions.REQUEST,
    createGetBuyerOrdersRequest(getBuyerOrdersDeliveredActions)
  );
}

export default getBuyerOrdersWatcher;
