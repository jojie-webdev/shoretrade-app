import _ from 'lodash';
import { useSelector } from 'react-redux';
import { TabOptions } from 'routes/Buyer/Orders/Orders.props';
import { GetAllSellerOrder } from 'types/store/GetAllSellerOrdersState';
import { GetSellerOrdersResponseItem } from 'types/store/GetSellerOrdersState';
import { Store } from 'types/store/Store';

export const GetAllBuyerOrdersCount = (state: Store, tab: TabOptions) => {
  if (tab === 'In Transit') {
    return (
      state.getBuyerOrdersTransit.data?.data?.orders.count.headerCount || {}
    );
  }

  if (tab === 'Complete') {
    return (
      state.getBuyerOrdersDelivered.data?.data?.orders.count.headerCount || {}
    );
  }

  return state.getBuyerOrdersPlaced.data?.data?.orders.count.headerCount || {};
};

export const GetAllBuyerOrdersSelectionCount = (
  state: Store,
  tab: TabOptions
) => {
  if (tab === 'In Transit') {
    return (
      state.getBuyerOrdersTransit.data?.data?.orders.count.selectionCount || 0
    );
  }

  if (tab === 'Complete') {
    return (
      state.getBuyerOrdersDelivered.data?.data?.orders.count.selectionCount || 0
    );
  }

  return (
    state.getBuyerOrdersPlaced.data?.data?.orders.count.selectionCount || 0
  );
};

const getAllBuyerOrdersPending = (state: Store) =>
  state.getBuyerOrdersPending.data?.data?.orders.orders || [];

const getAllBuyerOrdersPlaced = (state: Store) =>
  state.getBuyerOrdersPlaced.data?.data?.orders.orders || [];

const getAllBuyerOrdersTransit = (state: Store) =>
  state.getBuyerOrdersTransit.data?.data?.orders.orders || [];

const getAllBuyerOrdersDelivered = (state: Store) =>
  state.getBuyerOrdersDelivered.data?.data?.orders.orders || [];

const GetAllBuyerOrders = (
  status: 'PENDING' | 'PLACED' | 'TRANSIT' | 'DELIVERED'
) => {
  const buyerOrdersPending = useSelector(getAllBuyerOrdersPending) || [];
  const buyerOrdersPlaced = useSelector(getAllBuyerOrdersPlaced) || [];
  const buyerOrdersTransit = useSelector(getAllBuyerOrdersTransit) || [];
  const buyerOrdersDelivered = useSelector(getAllBuyerOrdersDelivered) || [];
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
): GetSellerOrdersResponseItem | any => {
  const buyerOrders = GetAllBuyerOrders(status);
  // @ts-ignore
  const allOrders = buyerOrders.reduce((accum, order) => {
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

export const GetBuyerOrdersToShipPending = () => {
  return GetAllBuyerOrders('PENDING');
};

export const GetBuyerOrdersToShip = () => {
  return GetAllBuyerOrders('PLACED');
};

export const GetBuyerOrdersInTransit = () => {
  return GetAllBuyerOrders('TRANSIT');
};

export const GetBuyerOrdersDelivered = () => {
  return GetAllBuyerOrders('DELIVERED');
};
