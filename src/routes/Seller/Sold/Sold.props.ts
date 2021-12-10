import { Dispatch } from 'react';

import { GetSellerOrdersResponseItem } from 'types/store/GetSellerOrdersState';
import { PlaceOrderMeta } from 'types/store/PlaceOrderState';

export interface PendingOrders extends GetSellerOrdersResponseItem {
  itemCount: number;
  totalWeight: number;
}

export type PendingToShipItemData = {
  buyerCompanyId: string;
  buyerCompanyName: string;
  deliveryMethod: string;
  deliveryMethodLabel: string;
  buyerId: string;
  orderCount: number;
  orders: PendingOrders[];
  totalPrice: number;
  totalWeight: number;
  salesChannel?: string;
  groupName?: string;
};

export type SoldItemData = {
  groupName: string;
  key: string;
  id: string;
  date: Date;
  type?: string;
  orderRefNumber: number;
  totalWeight: number;
  totalPrice: number;
  orders: {
    id: string;
    unit: string;
    weightConfirmed: boolean;
    orderNumber: string;
    buyer: string;
    uri: string;
    price: string;
    weight: string;
    name: string;
    tags: { label: string }[];
    size: string;
    fisherman: string;
    totalPrice: string;
  }[];
  toAddressState: string;
  allowPartialShipment: boolean;
  allowFullShipment: boolean;
  buyerId: string;
  buyerCompanyName: string;
  buyerCompanyId: string;
  salesChannel: string;
};

export type SoldItem = {
  title: string;
  data: { [p: string]: SoldItemData[] };
  orderTotal: number;
  rawData: {
    [index: string]: GetSellerOrdersResponseItem[];
  };
};

export type RequestFilters = {
  page: string;
  dateFrom: moment.Moment | null;
  dateTo: moment.Moment | null;
  term: string;
};

export type TabOptions = 'To Ship' | 'In Transit' | 'Delivered';

export interface SoldGeneratedProps {
  toShip: SoldItem[];
  pendingToShip: PendingToShipItemData[];
  inTransit: SoldItem[];
  delivered: SoldItem[];
  toShipCount: number;
  count: number;
  inTransitCount: number;
  deliveredCount: number;
  currentTab: TabOptions;
  onChangeCurrentTab: (newTab: TabOptions) => void;
  loadingCurrentTab: boolean;
  // getOrders: {
  //   placed: (filter?: {
  //     page: string;
  //     dateFrom: string;
  //     dateTo: string;
  //   }) => void;
  //   transit: () => void;
  //   delivered: (filter?: {
  //     page: string;
  //     dateFrom: string;
  //     dateTo: string;
  //   }) => void;
  // };
  filters: {
    pendingFilters: RequestFilters;
    toShipFilters: RequestFilters;
    inTransitFilters: RequestFilters;
    deliveredFilters: RequestFilters;
  };
  updateFilters: {
    updatePendingFilters: Dispatch<Partial<RequestFilters>>;
    updateToShipFilters: Dispatch<Partial<RequestFilters>>;
    updateInTransitFilters: Dispatch<Partial<RequestFilters>>;
    updateDeliveredFilters: Dispatch<Partial<RequestFilters>>;
  };
  token: string;
  sendMessage: (buyerId: string, message: string) => void;
  isSendingMessage: boolean;
  isPlacingOrder: boolean;
  placeOrder: (data: PlaceOrderMeta) => void;
}
