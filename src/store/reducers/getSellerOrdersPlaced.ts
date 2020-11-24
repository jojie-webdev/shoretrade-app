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

  console.log(newPendingOrders[ndx]);

  return newPendingOrders;
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
    };
  }
);
