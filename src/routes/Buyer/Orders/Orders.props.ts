import { Dispatch } from 'react';

export interface OrderItem {
  id: string;
  confirmed: boolean;
  data: {
    orderRefNumber: number;
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
    shippingTo: string;
    shippingFrom: string;
    shippingChargeGst: number;
    shippingChargeNet: number;
    total: string;
  };

  estDeliveryDate: Date;
  estCatchmentDate: Date;
  deliveredDate: Date;
  price: string;
  isAquafuture: boolean;
  token?: string;
}

export type RequestFilters = {
  page: string;
  dateFrom: string;
  dateTo: string;
};

export type TabOptions = 'Pending' | 'In Transit' | 'Complete';

export interface OrdersGeneratedProps {
  pendingOrders: {
    [index: string]: OrderItem[];
  };
  inTransitOrders: {
    [index: string]: OrderItem[];
  };
  completedOrders: {
    [index: string]: OrderItem[];
  };
  currentTab: TabOptions;
  onChangeCurrentTab: (newTab: TabOptions) => void;
  loadingCurrentTab: boolean;
  getAllOrders: () => void;
  pendingOrdersCount: string;
  completedOrdersCount: string;
  inTransitOrdersCount: string;
  filters: {
    pendingOrdersFilter: RequestFilters;
    completedOrdersFilter: RequestFilters;
    inTransitOrdersFilter: RequestFilters;
  };
  updateFilters: {
    updatePendingOrdersFilter: Dispatch<Partial<RequestFilters>>;
    updateCompletedOrdersFilter: Dispatch<Partial<RequestFilters>>;
    updateInTransitOrdersFilter: Dispatch<Partial<RequestFilters>>;
  };
  token: string;
}

export type DateType = 'estCatchmentDate' | 'estDeliveryDate' | 'deliveredDate';
