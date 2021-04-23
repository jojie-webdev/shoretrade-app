import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';

const getBuyerOrdersPending = (state: Store) =>
  state.getBuyerOrdersPlaced.data?.data.pendingOrders || [];

const getBuyerOrdersPlaced = (state: Store) =>
  state.getBuyerOrdersPlaced.data?.data.orders || [];

const getBuyerOrdersTransit = (state: Store) =>
  state.getBuyerOrdersTransit.data?.data.orders || [];

const getBuyerOrdersDelivered = (state: Store) =>
  state.getBuyerOrdersDelivered.data?.data.orders || [];

const GetBuyerOrders = (
  status: 'PENDING' | 'PLACED' | 'TRANSIT' | 'DELIVERED'
) => {
  const buyerOrdersPending = useSelector(getBuyerOrdersPending) || [];
  const buyerOrdersPlaced = useSelector(getBuyerOrdersPlaced) || [];
  const buyerOrdersTransit = useSelector(getBuyerOrdersTransit) || [];
  const buyerOrdersDelivered = useSelector(getBuyerOrdersDelivered) || [];
  return {
    PENDING: buyerOrdersPending,
    PLACED: buyerOrdersPlaced,
    TRANSIT: buyerOrdersTransit,
    DELIVERED: buyerOrdersDelivered,
  }[status];
};

export const GetBuyerOrder = (
  id: string,
  status: 'PENDING' | 'PLACED' | 'TRANSIT' | 'DELIVERED'
) => {
  return GetBuyerOrders(status).find((o) => o.orderId === id);
};

export const GetBuyerOrdersToShipPending = () => {
  return GetBuyerOrders('PENDING');
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
