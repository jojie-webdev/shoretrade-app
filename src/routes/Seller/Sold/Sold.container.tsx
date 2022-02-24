import React, { useEffect, useReducer } from 'react';

import { push } from 'connected-react-router';
import { SELLER_SOLD_ROUTES } from 'consts';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  getSellerOrdersPlacedActions,
  getSellerOrdersTransitActions,
  getSellerOrdersDeliveredActions,
  sendMessageActions,
  placeOrderActions,
  getSellerOrdersPendingActions,
} from 'store/actions';
import {
  GetAllSellerOrdersCount,
  GetAllSellerOrdersSelectionCount,
  GetSellerOrdersToShipPending,
  GetSellerOrdersToShip,
  GetSellerOrdersInTransit,
  GetSellerOrdersDelivered,
} from 'store/selectors/seller/orders';
import { GetAllSellerOrder } from 'types/store/GetAllSellerOrdersState';
import { PlaceOrderMeta } from 'types/store/PlaceOrderState';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';

import {
  SoldGeneratedProps,
  TabOptions,
  RequestFilters,
  SoldItem,
} from './Sold.props';
import {
  orderItemToPendingToShipItem,
  orderItemToSoldItemData,
} from './Sold.tranform';
import SoldView from './Sold.view';

const Sold = (): JSX.Element => {
  // MARK:- Hooks
  const dispatch = useDispatch();
  const location = useLocation();
  const { tab } = qs.parse(location.search, { ignoreQueryPrefix: true }) as {
    tab: TabOptions;
  };

  // MARK:- Selectors
  const token = useSelector((state: Store) => state.auth.token) || '';

  const {
    placed: toShipCount,
    transit: inTransitCount,
    forCollection: collectableCount,
    delivered: deliveredCount,
  } = useSelector(GetAllSellerOrdersCount);

  const count = useSelector(GetAllSellerOrdersSelectionCount);

  const pendingGetOrdersPlaced =
    useSelector((state: Store) => state.getSellerOrdersPlaced.pending) || false;

  const pendingGetOrdersTransit =
    useSelector((state: Store) => state.getSellerOrdersTransit.pending) ||
    false;

  const pendingGetOrdersDelivered =
    useSelector((state: Store) => state.getSellerOrdersDelivered.pending) ||
    false;

  const isSendingMessage =
    useSelector((state: Store) => state.sendMessage.pending) || false;

  const isPlacingOrder =
    useSelector((state: Store) => state.placeOrder.pending) || false;

  // MARK:- Reducers
  const [pendingFilters, updatePendingFilters] = useReducer(
    createUpdateReducer<RequestFilters>(),
    {
      page: '1',
      term: '',
      dateFrom: null,
      dateTo: null,
    }
  );

  const [toShipFilters, updateToShipFilters] = useReducer(
    createUpdateReducer<RequestFilters>(),
    {
      page: '1',
      term: '',
      dateFrom: null,
      dateTo: null,
    }
  );

  const [inTransitFilters, updateInTransitFilters] = useReducer(
    createUpdateReducer<RequestFilters>(),
    {
      page: '1',
      term: '',
      dateFrom: null,
      dateTo: null,
    }
  );

  const [deliveredFilters, updateDeliveredFilters] = useReducer(
    createUpdateReducer<RequestFilters>(),
    {
      page: '1',
      term: '',
      dateFrom: null,
      dateTo: null,
    }
  );

  // MARK:- State
  const currentTab: TabOptions = tab ? tab : 'To Ship';

  // MARK: Methods

  const sendMessage = (buyerId: string, message: string) => {
    if (buyerId && message) {
      dispatch(
        sendMessageActions.request({
          buyerId: buyerId || '',
          message,
        })
      );
    }
  };

  const getOrdersPending = (filter?: { page: string; term: string }) => {
    dispatch(getSellerOrdersPendingActions.request(filter));
  };

  const getOrdersPlaced = (filter?: { page: string; term: string }) => {
    dispatch(getSellerOrdersPlacedActions.request(filter));
  };

  const getOrdersTransit = (filter?: { page: string; term: string }) => {
    dispatch(getSellerOrdersTransitActions.request(filter));
  };

  const getOrdersDelivered = (filter?: { page: string; term: string }) => {
    dispatch(getSellerOrdersDeliveredActions.request(filter));
  };

  const rawDataToSoldItems = (rawData: GetAllSellerOrder[]): SoldItem[] => {
    return rawData.map((orderGroup) => {
      const toShipItemData = orderItemToSoldItemData(orderGroup);
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

  const onChangeCurrentTab = (newTab: TabOptions) => {
    dispatch(
      push(
        `${SELLER_SOLD_ROUTES.LANDING}${qs.stringify(
          { tab: newTab },
          { addQueryPrefix: true }
        )}`
      )
    );
  };

  const placeOrder = (data: PlaceOrderMeta) => {
    dispatch(placeOrderActions.request(data));
  };

  // MARK:- Variables
  const getOrders = {
    pending: getOrdersPending,
    placed: getOrdersPlaced,
    transit: getOrdersTransit,
    delivered: getOrdersDelivered,
  };

  const pendingToShip = orderItemToPendingToShipItem(
    GetSellerOrdersToShipPending()
  );

  const toShip = rawDataToSoldItems(GetSellerOrdersToShip());
  const inTransit = rawDataToSoldItems(GetSellerOrdersInTransit());
  const delivered = rawDataToSoldItems(GetSellerOrdersDelivered());

  const filters = {
    pendingFilters,
    toShipFilters,
    inTransitFilters,
    deliveredFilters,
  };

  const updateFilters = {
    updatePendingFilters,
    updateToShipFilters,
    updateInTransitFilters,
    updateDeliveredFilters,
  };

  const pendingGetOrders: Record<TabOptions, boolean> = {
    'To Ship': pendingGetOrdersPlaced,
    'In Transit': pendingGetOrdersTransit,
    Delivered: pendingGetOrdersDelivered,
  };

  const loadingCurrentTab = pendingGetOrders[currentTab];

  // MARK:- Effects
  useEffect(() => {
    if (currentTab === 'To Ship') {
      getOrders.pending(pendingFilters);
      getOrders.placed(toShipFilters);
    }
    // eslint-disable-next-line
  }, [
    currentTab,
    toShipFilters.page,
    toShipFilters.term,
    toShipFilters.dateFrom,
    toShipFilters.dateTo,
  ]);

  useEffect(() => {
    if (currentTab === 'In Transit') {
      getOrders.transit(inTransitFilters);
    }
    // eslint-disable-next-line
  }, [
    currentTab,
    inTransitFilters.page,
    inTransitFilters.term,
    inTransitFilters.dateFrom,
    inTransitFilters.dateTo,
  ]);

  useEffect(() => {
    if (currentTab === 'Delivered') {
      getOrders.delivered(deliveredFilters);
    }
    // eslint-disable-next-line
  }, [
    currentTab,
    deliveredFilters.page,
    deliveredFilters.term,
    deliveredFilters.dateFrom,
    deliveredFilters.dateTo,
  ]);

  const generatedProps: SoldGeneratedProps = {
    // generated props here
    currentTab,
    onChangeCurrentTab,
    loadingCurrentTab: loadingCurrentTab,
    // getOrders,
    toShip,
    pendingToShip,
    inTransit,
    delivered,
    count,
    toShipCount,
    inTransitCount:
      inTransitCount && inTransitCount + (collectableCount ?? null),
    deliveredCount,
    filters,
    updateFilters,
    token,
    sendMessage,
    isSendingMessage,
    isPlacingOrder,
    placeOrder,
  };
  return <SoldView {...generatedProps} />;
};

export default Sold;
