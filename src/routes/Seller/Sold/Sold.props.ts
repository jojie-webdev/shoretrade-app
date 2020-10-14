import { Dispatch } from 'react';

export type PendingToShipItemData = {
  id: string;
  orderNumber: string;
  numberOfOrders: number;
};

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
  }[];
};

export type ToShipItem = {
  title: Date;
  data: ToShipItemData[];
};

export type InTransitItemData = {
  id: string;
  date: Date;
  amount: string;
  buyer: string;
  orderRefNumber: number;
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
}
