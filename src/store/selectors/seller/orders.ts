import _ from 'lodash';
import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';

const getAllSellerOrdersPending = (state: Store) =>
  state.getSellerOrdersPending.data?.data.orders || [];

const getAllSellerOrdersPlaced = (state: Store) =>
  state.getSellerOrdersPlaced.data?.data.orders || [];

const getAllSellerOrdersTransit = (state: Store) =>
  state.getSellerOrdersTransit.data?.data.orders || [];

const getAllSellerOrdersDelivered = (state: Store) =>
  state.getSellerOrdersDelivered.data?.data.orders || [];

const GetAllSellerOrders = (
  status: 'PENDING' | 'PLACED' | 'TRANSIT' | 'DELIVERED'
) => {
  const sellerOrdersPending = useSelector(getAllSellerOrdersPending);
  const sellerOrdersPlaced = useSelector(getAllSellerOrdersPlaced);
  const sellerOrdersTransit = useSelector(getAllSellerOrdersTransit);
  const sellerOrdersDelivered = useSelector(getAllSellerOrdersDelivered);
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
  const sellerOrders = GetAllSellerOrders(status);
  const allOrders = sellerOrders.reduce((arr, order) => {
    const { date, ...obj } = order;
    const objects = _.flattenDeep([Object.values(obj)]);
    return [...arr, ...objects];
  }, []);
  const orders = Object.values(sellerOrders).filter(
    (r) => typeof r === 'string'
  );
  return orders.length > 0 ? orders[0].roadDeliveryOrders[0] : undefined;
};

export const GetSellerOrdersToShip = () => {
  return GetAllSellerOrders('PLACED');
};

export const GetSellerOrdersToShipPending = () => {
  return GetAllSellerOrders('PENDING');
};

export const GetSellerOrdersInTransit = () => {
  return GetAllSellerOrders('TRANSIT');
};

export const GetSellerOrdersDelivered = () => {
  return GetAllSellerOrders('DELIVERED');
};
