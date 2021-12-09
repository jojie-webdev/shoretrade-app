// TODO: refactor to avoid mutation

import { ConfirmWeightMeta } from 'types/store/ConfirmWeightState';
import {
  GetSellerOrdersMeta,
  GetSellerOrdersPayload,
  GetSellerOrdersResponseItem,
} from 'types/store/GetSellerOrdersState';
import { createAsyncReducer } from 'utils/Redux';

import { getSellerOrdersPlacedActions } from '../actions';

export const updateToConfirmed = (
  pendingOrders: GetSellerOrdersResponseItem[],
  meta: Partial<ConfirmWeightMeta>
): GetSellerOrdersResponseItem[] => {
  const ndx = pendingOrders.findIndex((po) => po.orderId === meta.orderId);

  if (ndx === -1) {
    return pendingOrders;
  }

  const lineItemNdx = pendingOrders[ndx].orderLineItem.findIndex(
    (oli) => oli.id === meta.orderLineItemId
  );

  if (lineItemNdx === -1) {
    return pendingOrders;
  }

  const newPendingOrders = [...pendingOrders];
  newPendingOrders[ndx].orderLineItem[lineItemNdx].weightConfirmed = true;
  if ((meta.listingBoxes || []).length > 0) {
    newPendingOrders[ndx].orderLineItem[lineItemNdx].listingBoxes = (
      meta.listingBoxes || []
    ).map((a) => ({
      ...a,
      count: a.count || null,
    }));

    // recompute total price from  updated boxes
    newPendingOrders[ndx].totalPrice = newPendingOrders[ndx].orderLineItem
      .reduce((accumA, currentA, index) => {
        const subTotalWeight = currentA.listingBoxes.reduce(
          (accumB: number, currentB) => {
            return accumB + currentB.quantity * currentB.weight;
          },
          0
        );

        const subTotalPrice = currentA.listing.pricePerKilo * subTotalWeight;

        if (index === lineItemNdx) {
          newPendingOrders[ndx].orderLineItem[
            lineItemNdx
          ].price = subTotalPrice;
          newPendingOrders[ndx].orderLineItem[
            lineItemNdx
          ].weight = subTotalWeight;
        }

        return accumA + subTotalPrice;
      }, 0)
      .toFixed(2);
  }

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
              action.meta || {}
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
