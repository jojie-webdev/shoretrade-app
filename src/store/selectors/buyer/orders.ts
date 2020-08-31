import { Store } from 'types/store/Store';

import useSelectorSafe from '../useSelectorSafe';

const getBuyerOrdersPlaced = (state: Store) =>
  state.getBuyerOrdersPlaced.data?.data.orders || [];

const getBuyerOrdersTransit = (state: Store) =>
  state.getBuyerOrdersTransit.data?.data.orders || [];

const getBuyerOrdersDelivered = (state: Store) =>
  state.getBuyerOrdersDelivered.data?.data.orders || [];

const GetBuyerOrders = (status: 'PLACED' | 'TRANSIT' | 'DELIVERED') => {
  const sellerOrdersPlaced = useSelectorSafe(getBuyerOrdersPlaced) || [];
  const sellerOrdersTransit = useSelectorSafe(getBuyerOrdersTransit) || [];
  const sellerOrdersDelivered = useSelectorSafe(getBuyerOrdersDelivered) || [];
  return {
    PLACED: sellerOrdersPlaced,
    TRANSIT: sellerOrdersTransit,
    DELIVERED: sellerOrdersDelivered,
  }[status];
};

export const GetBuyerOrder = (
  id: string,
  status: 'PLACED' | 'TRANSIT' | 'DELIVERED'
) => {
  return GetBuyerOrders(status).find((o) => o.orderId === id);
};

export const GetBuyerOrdersToShip = () => {
  return GetBuyerOrders('PLACED');
};

export const GetBuyerOrdersInTransit = () => {
  return GetBuyerOrders('TRANSIT');
};

export const GetBuyerOrdersDelivered = () => {
  return GetBuyerOrders('DELIVERED');
};
