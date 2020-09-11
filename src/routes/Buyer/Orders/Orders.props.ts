import { Dispatch } from 'react';

export interface OrderItem {
  id: string;
  confirmed: boolean;
  data: {
    orderNumber: string;
    seller: string;
    orderedBy: string;
    detailsProps: {
      uri: string;
      name: string;
      price: string;
      tags: {
        label: string;
      }[];
      weight: string;
      unit: string;
      size: string;
      location: string;
      vendor: string;
      cBorderRadius: string;
      cBorderWidth: string;
    }[];
    shippingOption: string;
    shippingPrice: string;
    total: string;
  };
  date: Date;
  price: string;
}

export type RequestFilters = {
  page: string;
  dateFrom: string;
  dateTo: string;
};

export type TabOptions = 'Pending' | 'In Transit' | 'Complete';

export interface OrdersGeneratedProps {
  pendingOrders: OrderItem[];
  inTransitOrders: OrderItem[];
  completedOrders: OrderItem[];
  currentTab: TabOptions;
  onChangeCurrentTab: (newTab: TabOptions) => void;
  loadingCurrentTab: boolean;
  getAllOrders: () => void;
  pendingOrdersCount: string;
  completedOrdersCount: string;
  filters: {
    pendingOrdersFilter: RequestFilters;
    completedOrdersFilter: RequestFilters;
  };
  updateFilters: {
    updatePendingOrdersFilter: Dispatch<Partial<RequestFilters>>;
    updateCompletedOrdersFilter: Dispatch<Partial<RequestFilters>>;
  };
  token: string;
}
