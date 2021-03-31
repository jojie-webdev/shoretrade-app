import { Dispatch } from 'react';

import { GetSellerOrdersResponseItem } from 'types/store/GetSellerOrdersState';
import { PlaceOrderMeta } from 'types/store/PlaceOrderState';

interface PendingOrders extends GetSellerOrdersResponseItem {
  itemCount: number;
  totalWeight: number;
}

export type PendingToShipItemData = {
  buyerCompanyId: string;
  buyerCompanyName: string;
  buyerId: string;
  orderCount: number;
  orders: PendingOrders[];
  totalPrice: number;
  totalWeight: number;
};

export type SoldItemData = {
  id: string;
  date: Date;
  type?: string;
  orderRefNumber: number;
  orders: {
    orderNumber: string;
    buyer: string;
    uri: string;
    price: string;
    weight: string;
    name: string;
    tags: { label: string }[];
    size: string;
    fisherman: string;
  }[];
  toAddressState: string;
};

export type SoldItem = {
  title: Date;
  data: { [p: string]: SoldItemData[] };
  orderTotal: number;
};

export type RequestFilters = {
  page: string;
  dateFrom: string;
  dateTo: string;
};

export type TabOptions = 'To Ship' | 'In Transit' | 'Delivered';

export interface SoldGeneratedProps {
  toShip: SoldItem[];
  pendingToShip: PendingToShipItemData[];
  inTransit: SoldItem[];
  delivered: SoldItem[];
  toShipCount: string;
  deliveredCount: string;
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
    toShipFilters: RequestFilters;
    deliveredFilters: RequestFilters;
  };
  updateFilters: {
    updateToShipFilters: Dispatch<Partial<RequestFilters>>;
    updateDeliveredFilters: Dispatch<Partial<RequestFilters>>;
  };
  token: string;
  sendMessage: (buyerId: string, message: string) => void;
  isSendingMessage: boolean;
  isPlacingOrder: boolean;
  placeOrder: (data: PlaceOrderMeta) => void;
}
