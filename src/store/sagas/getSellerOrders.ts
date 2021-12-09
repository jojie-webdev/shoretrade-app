import { put, takeLatest } from 'redux-saga/effects';
// import { getSellerOrders } from 'services/orders';
import { AsyncAction } from 'types/Action';
import {
  GetSellerOrdersMeta,
  GetSellerOrdersPayload,
} from 'types/store/GetSellerOrdersState';
// import { Store } from 'types/store/Store';

import {
  getSellerOrdersActions,
  getSellerOrdersPlacedActions,
  getSellerOrdersTransitActions,
  getSellerOrdersDeliveredActions,
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

function* getSellerOrdersWatcher() {
  yield takeLatest(
    getSellerOrdersActions.REQUEST,
    getSellerOrdersActionsRequest
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
