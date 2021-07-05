import React, { useState, useEffect, useReducer } from 'react';

import { BUYER_ROUTES } from 'consts';
import moment from 'moment';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import {
  getBuyerOrdersActions,
  getBuyerOrdersPlacedActions,
  getBuyerOrdersTransitActions,
  getBuyerOrdersDeliveredActions,
  sendDisputeActions,
} from 'store/actions';
import {
  GetBuyerOrdersToShipPending,
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
import { groupByDate, transformOrder } from './Orders.transform';
import OrdersView from './Orders.view';

const OrdersContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { tab } = qs.parse(location.search, { ignoreQueryPrefix: true }) as {
    tab: TabOptions;
  };

  const token = useSelector((state: Store) => state.auth.token) || '';

  const [initialPending, setInitialPending] = useState(true);

  const getAllOrders = () => {
    dispatch(getBuyerOrdersActions.request());
  };

  const getOrdersPlaced = (filter?: {
    page: string;
    term: string;
    dateFrom: moment.Moment | null;
    dateTo: moment.Moment | null;
  }) => {
    dispatch(getBuyerOrdersPlacedActions.request(filter));
  };

  const getOrdersTransit = (filter?: {
    page: string;
    term: string;
    dateFrom: moment.Moment | null;
    dateTo: moment.Moment | null;
  }) => {
    dispatch(getBuyerOrdersTransitActions.request(filter));
  };

  const getOrdersDelivered = (filter?: {
    page: string;
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

  const pendingOrders = GetBuyerOrdersToShipPending().map(transformOrder);
  const toShipOrders = GetBuyerOrdersToShip().map(transformOrder);
  const inTransitOrders = GetBuyerOrdersInTransit().map(transformOrder);
  const completedOrders = GetBuyerOrdersDelivered().map(transformOrder);

  const currentTab: TabOptions = tab ? tab : 'Pending';
  const onChangeCurrentTab = (newTab: TabOptions) => {
    history.push(
      `${BUYER_ROUTES.ORDERS}${qs.stringify(
        { tab: newTab },
        { addQueryPrefix: true }
      )}`
    );
  };

  const toShipOrdersCount =
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

  const [toShipOrdersFilter, updateToShipOrdersFilter] = useReducer(
    createUpdateReducer<RequestFilters>(),
    {
      page: '1',
      term: '',
      dateFrom: null,
      dateTo: null,
    }
  );

  const [inTransitOrdersFilter, updateInTransitOrdersFilter] = useReducer(
    createUpdateReducer<RequestFilters>(),
    {
      page: '1',
      term: '',
      dateFrom: null,
      dateTo: null,
    }
  );

  const [completedOrdersFilter, updateCompletedOrdersFilter] = useReducer(
    createUpdateReducer<RequestFilters>(),
    {
      page: '1',
      term: '',
      dateFrom: null,
      dateTo: null,
    }
  );

  const updateFilters = {
    updateToShipOrdersFilter,
    updateCompletedOrdersFilter,
    updateInTransitOrdersFilter,
  };

  // useEffect(() => {
  //   if (currentTab === 'Pending' && !initialPending) {
  //     getOrders.placed(toShipOrdersFilter);

  //     currentFilter = toShipOrdersFilter;
  //   }
  //   if (currentTab === 'In Transit') {
  //     getOrders.transit(inTransitOrdersFilter);

  //     currentFilter = inTransitOrdersFilter;
  //   }
  //   if (currentTab === 'Complete') {
  //     getOrders.delivered(completedOrdersFilter);
  //     currentFilter = completedOrdersFilter;
  //   }
  // }, [currentTab]);

  useEffect(() => {
    if (currentTab === 'Pending') {
      getOrders.placed(toShipOrdersFilter);
    }
  }, [
    currentTab,
    toShipOrdersFilter.page,
    toShipOrdersFilter.term,
    toShipOrdersFilter.dateFrom,
    toShipOrdersFilter.dateTo,
  ]);

  useEffect(() => {
    if (currentTab === 'In Transit') {
      getOrders.transit(inTransitOrdersFilter);
    }
  }, [
    currentTab,
    inTransitOrdersFilter.page,
    inTransitOrdersFilter.term,
    inTransitOrdersFilter.dateFrom,
    inTransitOrdersFilter.dateTo,
  ]);

  useEffect(() => {
    if (currentTab === 'Complete') {
      getOrders.delivered(completedOrdersFilter);
    }
  }, [
    currentTab,
    completedOrdersFilter.page,
    completedOrdersFilter.term,
    completedOrdersFilter.dateFrom,
    completedOrdersFilter.dateTo,
  ]);

  const filters = {
    toShipOrdersFilter,
    completedOrdersFilter,
    inTransitOrdersFilter,
  };

  const pendingGetOrders: Record<TabOptions, boolean> = {
    Pending: pendingGetOrdersPlaced,
    'In Transit': pendingGetOrdersTransit,
    Complete: pendingGetOrdersDelivered,
  };

  const loadingCurrentTab = pendingGetOrders[currentTab];

  const isSendingDispute = useSelector(
    (state: Store) => state.sendDispute.pending || false
  );

  const sendDispute = (orderId: string, message: string) => {
    if (orderId && message) {
      dispatch(
        sendDisputeActions.request({
          orderId,
          message,
        })
      );
    }
  };
  const generatedProps: OrdersGeneratedProps = {
    pendingOrders: groupByDate('estCatchmentDate')(pendingOrders),
    toShipOrders: groupByDate('estDeliveryDate')(toShipOrders),
    inTransitOrders: groupByDate('estDeliveryDate')(inTransitOrders),
    completedOrders: groupByDate('deliveredDate')(completedOrders),
    getAllOrders,
    toShipOrdersCount,
    completedOrdersCount,
    inTransitOrdersCount,
    filters,
    updateFilters,
    currentTab,
    loadingCurrentTab,
    onChangeCurrentTab,
    token,

    isSendingDispute,
    sendDispute,
  };

  return <OrdersView {...generatedProps} />;
};

export default OrdersContainer;
