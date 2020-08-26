import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';

const getSellerOrdersPending = (state: Store) =>
  state.getSellerOrdersPlaced.data?.data.pendingOrders || [];

const getSellerOrdersPlaced = (state: Store) =>
  state.getSellerOrdersPlaced.data?.data.orders || [];

const getSellerOrdersTransit = (state: Store) =>
  state.getSellerOrdersTransit.data?.data.orders || [];

const getSellerOrdersDelivered = (state: Store) =>
  state.getSellerOrdersDelivered.data?.data.orders || [];

const GetSellerOrders = (
  status: 'PENDING' | 'PLACED' | 'TRANSIT' | 'DELIVERED'
) => {
  const sellerOrdersPending = useSelector(getSellerOrdersPending) || [];
  const sellerOrdersPlaced = useSelector(getSellerOrdersPlaced) || [];
  const sellerOrdersTransit = useSelector(getSellerOrdersTransit) || [];
  const sellerOrdersDelivered = useSelector(getSellerOrdersDelivered) || [];
  return {
    PENDING: sellerOrdersPending,
    PLACED: sellerOrdersPlaced,
    TRANSIT: sellerOrdersTransit,
    DELIVERED: sellerOrdersDelivered,
  }[status];
};

export const GetSellerOrder = (
  id: string,
  status: 'PENDING' | 'PLACED' | 'TRANSIT' | 'DELIVERED'
) => {
  return GetSellerOrders(status).find((o) => o.orderId === id);
};

export const GetSellerOrdersToShip = () => {
  return GetSellerOrders('PLACED');
};

export const GetSellerOrdersToShipPending = () => {
  return GetSellerOrders('PENDING');
};

export const GetSellerOrdersInTransit = () => {
  return GetSellerOrders('TRANSIT');
};

export const GetSellerOrdersDelivered = () => {
  return GetSellerOrders('DELIVERED');
};
