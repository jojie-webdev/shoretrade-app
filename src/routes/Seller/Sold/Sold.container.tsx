import React, { useState, useEffect, useReducer } from 'react';

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
} from 'store/actions';
import {
  GetSellerOrdersToShipPending,
  GetSellerOrdersToShip,
  GetSellerOrdersInTransit,
  GetSellerOrdersDelivered,
} from 'store/selectors/seller/orders';
import { GetSellerOrdersResponseItem } from 'types/store/GetSellerOrdersState';
import { PlaceOrderMeta } from 'types/store/PlaceOrderState';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';

import { SoldGeneratedProps, TabOptions, RequestFilters } from './Sold.props';
import {
  orderItemToPendingToShipItem,
  groupToShipOrders,
  orderItemToSoldItemData,
} from './Sold.tranform';
import SoldView from './Sold.view';
const Sold = (): JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();

  const token = useSelector((state: Store) => state.auth.token) || '';

  const getOrdersPlaced = (filter?: {
    page: string;
    dateFrom: string;
    dateTo: string;
  }) => {
    if (filter?.page) {
      // prevent firing action twice on mount
      dispatch(getSellerOrdersPlacedActions.request(filter));
    }
  };

  const getOrdersTransit = () => {
    dispatch(getSellerOrdersTransitActions.request());
  };

  const getOrdersDelivered = (filter?: {
    page: string;
    dateFrom: string;
    dateTo: string;
  }) => {
    dispatch(getSellerOrdersDeliveredActions.request(filter));
  };

  const getOrders = {
    placed: getOrdersPlaced,
    transit: getOrdersTransit,
    delivered: getOrdersDelivered,
  };

  const pendingGetOrdersPlaced =
    useSelector((state: Store) => state.getSellerOrdersPlaced.pending) || false;

  const pendingGetOrdersTransit =
    useSelector((state: Store) => state.getSellerOrdersTransit.pending) ||
    false;

  const pendingGetOrdersDelivered =
    useSelector((state: Store) => state.getSellerOrdersDelivered.pending) ||
    false;

  const pendingToShip = orderItemToPendingToShipItem(
    GetSellerOrdersToShipPending()
  );

  const rawDataToSoldItems = (rawData: GetSellerOrdersResponseItem[]) => {
    return groupToShipOrders(rawData).map((orderGroup) => {
      const toShipItemData = orderItemToSoldItemData(orderGroup.data);
      const orderTotal = Object.keys(toShipItemData).reduce(
        (accum, current) => {
          return (
            accum +
            toShipItemData[current].reduce((accumA, currentA) => {
              return accumA + currentA.orders.length;
            }, 0)
          );
        },
        0
      );
      return {
        title: orderGroup.title,
        data: toShipItemData,
        orderTotal,
      };
    });
  };

  const toShip = rawDataToSoldItems(GetSellerOrdersToShip());
  const inTransit = rawDataToSoldItems(GetSellerOrdersInTransit());
  const delivered = rawDataToSoldItems(GetSellerOrdersDelivered());

  const toShipCount =
    useSelector(
      (state: Store) => state.getSellerOrdersPlaced.data?.data.count
    ) || '1';

  const deliveredCount =
    useSelector(
      (state: Store) => state.getSellerOrdersDelivered.data?.data.count
    ) || '1';

  const [currentTab, setCurrentTab] = useState<TabOptions>('To Ship');

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

  useEffect(() => {
    const { tab } = qs.parse(location.search, { ignoreQueryPrefix: true }) as {
      tab: TabOptions;
    };

    if (!tab) {
      setCurrentTab('To Ship');
      return;
    }

    setCurrentTab(tab);
  }, [location.search]);

  useEffect(() => {
    if (currentTab === 'To Ship') {
      if (toShip.length === 0 && pendingToShip.length === 0) {
        getOrders.placed();
      }
    }

    if (currentTab === 'In Transit') {
      if (inTransit.length === 0) {
        getOrders.transit();
      }
    }

    if (currentTab === 'Delivered') {
      if (delivered.length === 0) {
        getOrders.delivered();
      }
    }
  }, [currentTab]);

  const [toShipFilters, updateToShipFilters] = useReducer(
    createUpdateReducer<RequestFilters>(),
    {
      page: '1',
      dateFrom: '',
      dateTo: '',
    }
  );

  const [deliveredFilters, updateDeliveredFilters] = useReducer(
    createUpdateReducer<RequestFilters>(),
    {
      page: '1',
      dateFrom: '',
      dateTo: '',
    }
  );

  useEffect(() => {
    if (currentTab === 'To Ship') {
      getOrders.placed(toShipFilters);
    }
  }, [toShipFilters.page, toShipFilters.dateFrom]);

  useEffect(() => {
    if (currentTab === 'Delivered') {
      getOrders.delivered(deliveredFilters);
    }
  }, [deliveredFilters.page, deliveredFilters.dateFrom]);

  const filters = {
    toShipFilters,
    deliveredFilters,
  };

  const updateFilters = {
    updateToShipFilters,
    updateDeliveredFilters,
  };

  const pendingGetOrders: Record<TabOptions, boolean> = {
    'To Ship': pendingGetOrdersPlaced,
    'In Transit': pendingGetOrdersTransit,
    Delivered: pendingGetOrdersDelivered,
  };

  const loadingCurrentTab = pendingGetOrders[currentTab];

  const isSendingMessage =
    useSelector((state: Store) => state.sendMessage.pending) || false;

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

  const isPlacingOrder =
    useSelector((state: Store) => state.placeOrder.pending) || false;
  const placeOrder = (data: PlaceOrderMeta) => {
    dispatch(placeOrderActions.request(data));
  };

  const generatedProps: SoldGeneratedProps = {
    // generated props here
    currentTab,
    onChangeCurrentTab,
    loadingCurrentTab,
    // getOrders,
    toShip,
    pendingToShip,
    inTransit,
    delivered,
    toShipCount,
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
