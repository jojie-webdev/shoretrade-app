import React, { useState, useEffect, useReducer } from 'react';

import { useDispatch, useSelector } from 'react-redux';

// import useSelectorSafe from 'store/selectors/useSelectorSafe';
import {
  getBuyerOrdersActions,
  getBuyerOrdersPlacedActions,
  getBuyerOrdersTransitActions,
  getBuyerOrdersDeliveredActions,
} from 'store/actions';
import {
  GetBuyerOrdersToShip,
  GetBuyerOrdersInTransit,
  GetBuyerOrdersDelivered,
} from 'store/selectors/buyer/';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';

import {
  OrdersGeneratedProps,
  TabOptions,
  RequestFilters,
} from './Orders.props';
import { transformOrder } from './Orders.transform';
import OrdersView from './Orders.view';

const OrdersContainer = (): JSX.Element => {
  const dispatch = useDispatch();

  const token = useSelector((state: Store) => state.auth.token) || '';

  const getAllOrders = () => {
    dispatch(getBuyerOrdersActions.request());
  };

  const getOrdersPlaced = (filter?: {
    page: string;
    dateFrom: string;
    dateTo: string;
  }) => {
    if (filter?.page) {
      dispatch(getBuyerOrdersPlacedActions.request(filter));
    }
  };

  const getOrdersTransit = () => {
    dispatch(getBuyerOrdersTransitActions.request());
  };

  const getOrdersDelivered = (filter?: {
    page: string;
    dateFrom: string;
    dateTo: string;
  }) => {
    dispatch(getBuyerOrdersDeliveredActions.request(filter));
  };

  const getOrders = {
    placed: getOrdersPlaced,
    transit: getOrdersTransit,
    delivered: getOrdersDelivered,
  };

  const pendingGetOrdersPlaced =
    useSelector((state: Store) => state.getBuyerOrdersPlaced.pending) || false;

  const pendingGetOrdersTransit =
    useSelector((state: Store) => state.getBuyerOrdersTransit.pending) || false;

  const pendingGetOrdersDelivered =
    useSelector((state: Store) => state.getBuyerOrdersDelivered.pending) ||
    false;

  const pendingOrders = GetBuyerOrdersToShip().map(transformOrder);
  const inTransitOrders = GetBuyerOrdersInTransit().map(transformOrder);
  const completedOrders = GetBuyerOrdersDelivered().map(transformOrder);

  const [currentTab, setCurrentTab] = useState<TabOptions>('Pending');
  const onChangeCurrentTab = (newTab: TabOptions) => setCurrentTab(newTab);

  useEffect(() => {
    if (currentTab === 'Pending') {
      if (pendingOrders.length === 0) {
        getOrders.placed();
      }
    }
    if (currentTab === 'In Transit') {
      if (inTransitOrders.length === 0) {
        getOrders.transit();
      }
    }
    if (currentTab === 'Complete') {
      if (completedOrders.length === 0) {
        getOrders.delivered();
      }
    }
  }, [currentTab]);

  const pendingOrdersCount =
    useSelector(
      (state: Store) => state.getBuyerOrdersPlaced.data?.data.count
    ) || '1';

  const completedOrdersCount =
    useSelector(
      (state: Store) => state.getBuyerOrdersDelivered.data?.data.count
    ) || '1';

  const [pendingOrdersFilter, updatePendingOrdersFilter] = useReducer(
    createUpdateReducer<RequestFilters>(),
    {
      page: '1',
      dateFrom: '',
      dateTo: '',
    }
  );

  const [completedOrdersFilter, updateCompletedOrdersFilter] = useReducer(
    createUpdateReducer<RequestFilters>(),
    {
      page: '1',
      dateFrom: '',
      dateTo: '',
    }
  );

  // useEffect(() => {
  //   getAllOrders()
  // },[]);

  useEffect(() => {
    if (currentTab === 'Pending') {
      getOrders.placed(pendingOrdersFilter);
    }
  }, [pendingOrdersFilter.page, pendingOrdersFilter.dateFrom]);

  useEffect(() => {
    if (currentTab === 'Complete') {
      getOrders.delivered(completedOrdersFilter);
    }
  }, [completedOrdersFilter.page, completedOrdersFilter.dateFrom]);

  const filters = {
    pendingOrdersFilter,
    completedOrdersFilter,
  };

  const updateFilters = {
    updatePendingOrdersFilter,
    updateCompletedOrdersFilter,
  };

  const pendingGetOrders: Record<TabOptions, boolean> = {
    Pending: pendingGetOrdersPlaced,
    'In Transit': pendingGetOrdersTransit,
    Complete: pendingGetOrdersDelivered,
  };

  const loadingCurrentTab = pendingGetOrders[currentTab];

  const generatedProps: OrdersGeneratedProps = {
    pendingOrders,
    inTransitOrders,
    completedOrders,

    getAllOrders,
    pendingOrdersCount,
    completedOrdersCount,
    filters,
    updateFilters,
    currentTab,
    loadingCurrentTab,
    onChangeCurrentTab,
    token,
  };

  return <OrdersView {...generatedProps} />;
};

export default OrdersContainer;
