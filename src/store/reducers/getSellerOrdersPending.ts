import {
  GetSellerOrdersMeta,
  GetSellerOrdersPayload,
} from 'types/store/GetSellerOrdersState';
import { createAsyncReducer } from 'utils/Redux';

import { getSellerOrdersPendingActions } from '../actions';
// import { updateToConfirmed } from './getSellerOrdersPlaced';

export default createAsyncReducer<GetSellerOrdersMeta, GetSellerOrdersPayload>(
  getSellerOrdersPendingActions
  // (state, action) => {
  //   return {
  //     [getSellerOrdersPendingActions.UPDATE_OPTIMISTICALLY]: {
  //       ...state,
  //       data: {
  //         ...state.data,
  //         data: {
  //           ...state.data?.data,
  //           orders: updateToConfirmed(
  //             state.data?.data?.orders || [],
  //             action.meta || {}
  //           ),
  //         },
  //       },
  //     } as any,
  //   };
  // }
);
