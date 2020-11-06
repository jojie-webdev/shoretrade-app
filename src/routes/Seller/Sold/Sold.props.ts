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
  orderCount: number;
  orders: PendingOrders[];
  totalPrice: number;
  totalWeight: number;
};

// export type PendingToShipItemData = {
//   id: string;
//   orderNumber: string;
//   numberOfOrders: number;
//   total: string;
//   buyerCompanyName: string;
//   orderImage: string;
//   type: string;
//   toAddressState: string;
// };

export type ToShipItemData = {
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

export type ToShipItem = {
  title: Date;
  data: { [p: string]: ToShipItemData[] };
  orderTotal: number;
};

export type InTransitItemData = {
  id: string;
  date: Date;
  amount: string;
  buyer: string;
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

export type InTransitItem = {
  state: string;
  deliveryMethod: Record<string, any>;
};

export type DeliveredItemData = {
  id: string;
  date: Date;
  amount: string;
  buyer: string;
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
};

export type DeliveredItem = {
  title: Date;
  data: DeliveredItemData[];
};

export type RequestFilters = {
  page: string;
  dateFrom: string;
  dateTo: string;
};

export type TabOptions = 'To Ship' | 'In Transit' | 'Delivered';

export interface SoldGeneratedProps {
  toShip: ToShipItem[];
  pendingToShip: PendingToShipItemData[];
  inTransit: InTransitItem[];
  delivered: DeliveredItem[];
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
