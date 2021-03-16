import { pathOr } from 'ramda';
import {
  GetSellerOrdersMeta,
  GetSellerOrdersPayload,
  GetSellerOrdersResponseItem,
} from 'types/store/GetSellerOrdersState';
import { createAsyncReducer } from 'utils/Redux';

import { getSellerOrdersPlacedActions } from '../actions';

const updateToConfirmed = (
  pendingOrders: GetSellerOrdersResponseItem[],
  id: string,
  orderLineItemId: string
): GetSellerOrdersResponseItem[] => {
  const ndx = pendingOrders.findIndex((po) => po.orderId === id);

  if (ndx === -1) {
    return pendingOrders;
  }

  const lineItemNdx = pendingOrders[ndx].orderLineItem.findIndex(
    (oli) => oli.id === orderLineItemId
  );

  if (lineItemNdx === -1) {
    return pendingOrders;
  }

  const newPendingOrders = [...pendingOrders];
  newPendingOrders[ndx].orderLineItem[lineItemNdx].weightConfirmed = true;

  return newPendingOrders;
};

const movePendingOrderToOrder = (
  data: {
    token: string;
    count: string;
    orders: GetSellerOrdersResponseItem[];
    pendingOrders?: GetSellerOrdersResponseItem[];
  },
  id: string
) => {
  const ndx = (data?.pendingOrders || []).findIndex((po) => po.orderId === id);

  if (ndx === -1) {
    return data;
  }

  const newPendingOrders = data?.pendingOrders?.filter(
    (po) => po.orderId !== id
  );
  const newOrderItems = [
    (data.pendingOrders as GetSellerOrdersResponseItem[])[ndx],
    ...(data.orders || []),
  ];

  return {
    ...data,
    pendingOrders: newPendingOrders,
    orders: newOrderItems,
  };
};

export default createAsyncReducer<GetSellerOrdersMeta, GetSellerOrdersPayload>(
  getSellerOrdersPlacedActions,
  (state, action) => {
    return {
      [getSellerOrdersPlacedActions.UPDATE_OPTIMISTICALLY]: {
        ...state,
        data: {
          ...state.data,
          data: {
            ...state.data?.data,
            pendingOrders: updateToConfirmed(
              state.data?.data?.pendingOrders || [],
              action.meta?.orderId || '',
              action.meta?.orderLineItemId || ''
            ),
          },
        },
      } as any,
      [getSellerOrdersPlacedActions.UPDATE_SHIP_ORDER_OPTIMISTICALLY]: {
        ...state,
        data: {
          ...state.data,
          data: movePendingOrderToOrder(
            state.data?.data as any,
            action.meta?.orderId || ''
          ),
        },
      } as any,
    };
  }
);
