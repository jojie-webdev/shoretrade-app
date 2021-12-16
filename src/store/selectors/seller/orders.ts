import _ from 'lodash';
import { useSelector } from 'react-redux';
import { GetAllSellerOrder } from 'types/store/GetAllSellerOrdersState';
import { GetSellerOrdersResponseItem } from 'types/store/GetSellerOrdersState';
import { Store } from 'types/store/Store';

export const GetAllSellerOrdersCount = (state: Store) =>
  state.getSellerOrdersPlaced.data?.data.count.headerCount || {};

export const GetAllSellerOrdersSelectionCount = (state: Store) =>
  state.getSellerOrdersPlaced.data?.data.count.selectionCount || 0;

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
): GetSellerOrdersResponseItem | any => {
  const sellerOrders = GetAllSellerOrders(status);
  // @ts-ignore
  const allOrders = sellerOrders.reduce((accum, order) => {
    const { date, ...obj }: GetAllSellerOrder = order;
    const objects = _.flattenDeep([Object.values(obj)]);
    // @ts-ignore
    return [...accum, ..._.flattenDeep(objects.map((o) => o.orders))];
  }, []);
  return (
    // @ts-ignore
    allOrders.find((o: GetSellerOrdersResponseItem) => o.orderId === id) || {}
  );
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
