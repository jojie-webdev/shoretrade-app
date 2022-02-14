import React, { useState, useEffect, useReducer } from 'react';

import { BUYER_ROUTES } from 'consts';
import moment from 'moment';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { orderItemToPendingToShipItem } from 'routes/Seller/Sold/Sold.tranform';
import {
  getBuyerOrdersPendingActions,
  getBuyerOrdersPlacedActions,
  getBuyerOrdersTransitActions,
  getBuyerOrdersDeliveredActions,
  getAllBuyerOrdersActions,
  sendDisputeActions,
  sendOrderRatingActions,
} from 'store/actions';
import {
  GetBuyerOrdersToShipPending,
  GetBuyerOrdersToShip,
  GetBuyerOrdersInTransit,
  GetBuyerOrdersDelivered,
} from 'store/selectors/buyer/';
import {
  GetAllBuyerOrdersCount,
  GetAllBuyerOrdersSelectionCount,
} from 'store/selectors/buyer/orders';
import { GetAllSellerOrder } from 'types/store/GetAllSellerOrdersState';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';

import {
  OrdersGeneratedProps,
  TabOptions,
  RequestFilters,
  GroupedOrderItemData,
} from './Orders.props';
import {
  groupByDate,
  orderItemToOrderItemData,
  orderItemToPendingOrderItem,
  transformOrder,
} from './Orders.transform';
import OrdersView from './Orders.view';

const OrdersContainer = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { tab } = qs.parse(location.search, { ignoreQueryPrefix: true }) as {
    tab: TabOptions;
  };

  const token = useSelector((state: Store) => state.auth.token) || '';

  // eslint-disable-next-line
  const [initialPending, setInitialPending] = useState(true);

  const getAllOrders = () => {
    dispatch(getAllBuyerOrdersActions.request());
  };

  const getOrdersPlaced = (filter?: {
    page: string;
    term: string;
    dateFrom: moment.Moment | null;
    dateTo: moment.Moment | null;
  }) => {
    dispatch(getBuyerOrdersPendingActions.request(filter));
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
    useSelector(
      (state: Store) =>
        state.getBuyerOrdersPending.pending ||
        state.getBuyerOrdersPlaced.pending
    ) || false;

  const pendingGetOrdersTransit =
    useSelector((state: Store) => state.getBuyerOrdersTransit.pending) || false;

  const pendingGetOrdersDelivered =
    useSelector((state: Store) => state.getBuyerOrdersDelivered.pending) ||
    false;

  const rawDataToOrderItems = (
    rawData: GetAllSellerOrder[]
  ): GroupedOrderItemData[] => {
    return rawData.map((orderGroup) => {
      const toShipItemData = orderItemToOrderItemData(orderGroup);
      const orderTotal = Object.keys(toShipItemData).reduce(
        (accum, current) => {
          return accum + toShipItemData[current].length;
        },
        0
      );
      return {
        title: orderGroup.date || '',
        data: toShipItemData,
        orderTotal,
      };
    });
  };

  const pendingOrders = orderItemToPendingOrderItem(
    GetBuyerOrdersToShipPending()
  );
  const toShipOrders = rawDataToOrderItems(GetBuyerOrdersToShip());
  const inTransitOrders = rawDataToOrderItems(GetBuyerOrdersInTransit());
  const completedOrders = rawDataToOrderItems(GetBuyerOrdersDelivered());

  const currentTab: TabOptions = tab ? tab : 'Pending';
  const onChangeCurrentTab = (newTab: TabOptions) => {
    history.push(
      `${BUYER_ROUTES.ORDERS}${qs.stringify(
        { tab: newTab },
        { addQueryPrefix: true }
      )}`
    );
  };

  const {
    placed: toShipOrdersCount,
    transit: inTransitOrdersCount,
    forCollection: collectableOrdersCount,
    delivered: completedOrdersCount,
  } = useSelector(GetAllBuyerOrdersCount);
  const selectionCount = useSelector(
    GetAllBuyerOrdersSelectionCount(currentTab)
  );

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
    // eslint-disable-next-line
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
    // eslint-disable-next-line
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
    // eslint-disable-next-line
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

  const isSendingOrderRating = useSelector(
    (state: Store) => state.sendOrderRating.pending
  );

  const isSendOrderRatingSuccess = useSelector(
    (state: Store) => !!state.sendOrderRating.data
  );

  const sendOrderRating = (
    orderId: string,
    rating: number,
    privateFeedback: string
  ) => {
    dispatch(
      sendOrderRatingActions.request({
        orderId,
        privateFeedback,
        rating,
      })
    );
  };

  const generatedProps: OrdersGeneratedProps = {
    pendingOrders,
    toShipOrders,
    inTransitOrders,
    completedOrders,
    getAllOrders,
    getCompletedOrders: getOrders.delivered,
    toShipOrdersCount,
    completedOrdersCount,
    inTransitOrdersCount: inTransitOrdersCount + collectableOrdersCount,
    selectionCount,
    filters,
    updateFilters,
    currentTab,
    loadingCurrentTab,
    onChangeCurrentTab,
    token,

    isSendingDispute,
    sendDispute,
    sendOrderRating,
    isSendingOrderRating,
    isSendOrderRatingSuccess,
  };

  return <OrdersView {...generatedProps} />;
};

export default OrdersContainer;
