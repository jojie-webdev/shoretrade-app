import produce from 'immer';
import { forEach, lensPath, pathOr, view, set } from 'ramda';
import { put, select, takeLatest } from 'redux-saga/effects';
// import { getSellerOrders } from 'services/orders';
import { AsyncAction, Action } from 'types/Action';
import { GetAllSellerOrdersPayload } from 'types/store/GetAllSellerOrdersState';
import {
  GetSellerOrdersMeta,
  GetSellerOrdersPayload,
  OrderStatus,
  SocketOrderConfirmWeightPayload,
  SocketOrderScanPayload,
} from 'types/store/GetSellerOrdersState';
import { Store } from 'types/store/Store';

import {
  getSellerOrdersActions,
  getSellerOrdersPlacedActions,
  getSellerOrdersTransitActions,
  getSellerOrdersDeliveredActions,
  getAllSellerOrdersActions,
  socketActions,
  getSellerOrdersPendingActions,
} from '../actions';

function* getSellerOrdersActionsRequest(
  action: AsyncAction<GetSellerOrdersMeta, GetSellerOrdersPayload>
) {
  yield put(getSellerOrdersPlacedActions.request());
  yield put(getSellerOrdersTransitActions.request());
  yield put(getSellerOrdersDeliveredActions.request());
}

// const createGetSellerOrdersRequest = (
//   actionCreator: typeof getSellerOrdersActions
// ) => {
//   return function* request(
//     action: AsyncAction<GetSellerOrdersMeta, GetSellerOrdersPayload>
//   ) {
//     const state: Store = yield select();
//     if (state.auth.token) {
//       try {
//         const { data } = yield call(
//           getSellerOrders,
//           action.meta,
//           state.auth.token
//         );
//         yield put(actionCreator.success(data));
//       } catch (e) {
//         yield put(actionCreator.failed(e.message));
//       }
//     } else {
//       yield put(actionCreator.failed('Token not found'));
//     }
//   };
// };

function* getSellerScanOrder(action: Action<any>) {
  const state: Store = yield select();
  const realtimeData: SocketOrderScanPayload = pathOr(
    { items: [] },
    ['payload'],
    action
  );
  const getSellerOrderPlacedData = state.getSellerOrdersPlaced.data;
  const headerCountLens = lensPath(['data', 'count', 'headerCount']);
  let headerCount: {
    [key: string]: number;
  } = view(headerCountLens, getSellerOrderPlacedData);
  const modifyData: GetAllSellerOrdersPayload | null = produce(
    state.getSellerOrdersPlaced,
    (draft) => {
      realtimeData.items.forEach((i) => {
        if (i.status === OrderStatus.FOR_COLLECTION) {
          if (draft.data) {
            headerCount = {
              ...headerCount,
              forCollection: headerCount['forCollection'] + 1,
            };
            draft.data.data.count.headerCount = headerCount;
          }
        }
        if (i.status === OrderStatus.IN_TRANSIT) {
          if (draft.data) {
            headerCount = {
              ...headerCount,
              forCollection: headerCount['transit'] + 1,
            };
            draft.data.data.count.headerCount = headerCount;
          }
        }
      });
      //TODO FIND ORDER and move/remove it
    }
  ).data;
  if (modifyData) {
    yield put(getSellerOrdersPlacedActions.patch(modifyData));
  }
}

function* updateSellerScanWeightConfirmed(action: Action<any>) {
  const state: Store = yield select();
  const realtimeData: SocketOrderConfirmWeightPayload = action.payload;
  const modifyData: GetAllSellerOrdersPayload | null = produce(
    state.getSellerOrdersPlaced,
    (draft) => {
      if (
        state.getSellerOrdersPlaced.data &&
        state.getSellerOrdersPlaced?.data?.data?.orders &&
        draft &&
        draft.data &&
        draft.data.data &&
        draft.data.data.orders
      ) {
        state.getSellerOrdersPlaced.data.data.orders.forEach((d, index) => {
          for (const [key, value] of Object.entries(d)) {
            if (Array.isArray(value)) {
              value.forEach((y, x) => {
                if (Array.isArray(y.orders)) {
                  y.orders.forEach((order, orderIdx) => {
                    if (draft.data && order.orderId === realtimeData.orderId) {
                      draft.data.data.orders[index][key][x].orders[
                        orderIdx
                      ].weightConfirmed = true;
                      draft.data.data.orders[index][key][x].orders[
                        orderIdx
                      ].weightConfirmed = true;
                      order.orderLineItem.forEach((ol, olIdx) => {
                        if (ol.id === realtimeData.lineItemId && draft.data) {
                          draft.data.data.orders[index][key][x].orders[
                            orderIdx
                          ].orderLineItem[olIdx].weightConfirmed = true;
                        }
                      });
                    }
                  });
                }
              });
            }
          }
        });
      }
    }
  ).data;
  if (
    modifyData &&
    state.getSellerOrdersPlaced.data &&
    state.getSellerOrdersPlaced?.data?.data?.orders
  ) {
    yield put(getSellerOrdersPlacedActions.patch(modifyData));
  }
}

function* getSellerOrdersWatcher() {
  yield takeLatest(
    getSellerOrdersActions.REQUEST,
    getSellerOrdersActionsRequest
  );
  yield takeLatest(socketActions.BARCODE_SCANNED, getSellerScanOrder);
  yield takeLatest(
    socketActions.WEIGHT_CONFIRMED,
    updateSellerScanWeightConfirmed
  );
  // yield takeLatest(
  //   getSellerOrdersPlacedActions.REQUEST,
  //   createGetSellerOrdersRequest(getSellerOrdersPlacedActions)
  // );
  // yield takeLatest(
  //   getSellerOrdersTransitActions.REQUEST,
  //   createGetSellerOrdersRequest(getSellerOrdersTransitActions)
  // );
  // yield takeLatest(
  //   getSellerOrdersDeliveredActions.REQUEST,
  //   createGetSellerOrdersRequest(getSellerOrdersDeliveredActions)
  // );
}

export default getSellerOrdersWatcher;
