import React, { useState, useEffect, useReducer } from 'react';

import moment from 'moment';
import { FocusedInputShape } from 'react-dates';
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
  OrderItem,
} from './Orders.props';
import { groupByDate, sortByDateAsc, transformOrder } from './Orders.transform';
import OrdersView from './Orders.view';

const OrdersContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const [fromFocusedInput, setFromFocusedInput] = useState<FocusedInputShape>(
    'startDate'
  );
  const [toFocusedInput, setToFocusedInput] = useState<FocusedInputShape>(
    'startDate'
  );
  const token = useSelector((state: Store) => state.auth.token) || '';

  const getAllOrders = () => {
    dispatch(getBuyerOrdersActions.request());
  };

  const getOrdersPlaced = (filter?: {
    term: string;
    dateFrom: moment.Moment | null;
    dateTo: moment.Moment | null;
  }) => {
    dispatch(getBuyerOrdersPlacedActions.request(filter));
  };

  const getOrdersTransit = (filter?: {
    term: string;
    dateFrom: moment.Moment | null;
    dateTo: moment.Moment | null;
  }) => {
    dispatch(getBuyerOrdersTransitActions.request(filter));
  };

  const getOrdersDelivered = (filter?: {
    term: string;
    dateFrom: moment.Moment | null;
    dateTo: moment.Moment | null;
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

  const pendingOrdersCount =
    useSelector(
      (state: Store) => state.getBuyerOrdersPlaced.data?.data.count
    ) || '1';

  const inTransitOrdersCount =
    useSelector(
      (state: Store) => state.getBuyerOrdersTransit.data?.data.count
    ) || '1';

  const completedOrdersCount =
    useSelector(
      (state: Store) => state.getBuyerOrdersDelivered.data?.data.count
    ) || '1';

  const today = moment();
  const last7Days = moment().subtract(7, 'days');

  const [pendingOrdersFilter, updatePendingOrdersFilter] = useReducer(
    createUpdateReducer<RequestFilters>(),
    {
      term: '',
      dateFrom: last7Days,
      dateTo: today,
    }
  );

  const [inTransitOrdersFilter, updateInTransitOrdersFilter] = useReducer(
    createUpdateReducer<RequestFilters>(),
    {
      term: '',
      dateFrom: last7Days,
      dateTo: moment(),
    }
  );

  const [completedOrdersFilter, updateCompletedOrdersFilter] = useReducer(
    createUpdateReducer<RequestFilters>(),
    {
      term: '',
      dateFrom: last7Days,
      dateTo: moment(),
    }
  );

  let currentFilter = pendingOrdersFilter;
  const updateFilters = {
    updatePendingOrdersFilter,
    updateCompletedOrdersFilter,
    updateInTransitOrdersFilter,
  };

  useEffect(() => {
    if (currentTab === 'Pending') {
      if (pendingOrders.length === 0) {
        getOrders.placed(pendingOrdersFilter);
      }
      currentFilter = pendingOrdersFilter;
    }
    if (currentTab === 'In Transit') {
      if (inTransitOrders.length === 0) {
        getOrders.transit(inTransitOrdersFilter);
      }
      currentFilter = inTransitOrdersFilter;
    }
    if (currentTab === 'Complete') {
      if (completedOrders.length === 0) {
        getOrders.delivered(completedOrdersFilter);
      }
      currentFilter = completedOrdersFilter;
    }
  }, [currentTab]);

  useEffect(() => {
    if (currentTab === 'Pending') {
      getOrders.placed(pendingOrdersFilter);
    }
  }, [
    pendingOrdersFilter.term,
    pendingOrdersFilter.dateFrom,
    pendingOrdersFilter.dateTo,
  ]);

  useEffect(() => {
    if (currentTab === 'In Transit') {
      getOrders.transit(inTransitOrdersFilter);
    }
  }, [
    inTransitOrdersFilter.term,
    inTransitOrdersFilter.dateFrom,
    inTransitOrdersFilter.dateTo,
  ]);

  useEffect(() => {
    if (currentTab === 'Complete') {
      getOrders.delivered(completedOrdersFilter);
    }
  }, [
    completedOrdersFilter.term,
    completedOrdersFilter.dateFrom,
    completedOrdersFilter.dateTo,
  ]);

  const filters = {
    pendingOrdersFilter,
    completedOrdersFilter,
    inTransitOrdersFilter,
  };

  const pendingGetOrders: Record<TabOptions, boolean> = {
    Pending: pendingGetOrdersPlaced,
    'In Transit': pendingGetOrdersTransit,
    Complete: pendingGetOrdersDelivered,
  };

  const loadingCurrentTab = pendingGetOrders[currentTab];

  const generatedProps: OrdersGeneratedProps = {
    pendingOrders: groupByDate('estCatchmentDate')(
      sortByDateAsc(pendingOrders, 'estCatchmentDate')
    ),
    inTransitOrders: groupByDate('estDeliveryDate')(
      sortByDateAsc(inTransitOrders, 'estDeliveryDate')
    ),
    completedOrders: groupByDate('deliveredDate')(
      sortByDateAsc(completedOrders, 'deliveredDate')
    ),

    getAllOrders,
    pendingOrdersCount,
    completedOrdersCount,
    inTransitOrdersCount,
    filters,
    updateFilters,
    currentFilter,
    currentTab,
    loadingCurrentTab,
    onChangeCurrentTab,
    token,
    fromFocusedInput,
    setFromFocusedInput,
  };

  return <OrdersView {...generatedProps} />;
};

export default OrdersContainer;
