import { Dispatch, SetStateAction } from 'react';

import moment from 'moment';
import { FocusedInputShape } from 'react-dates';

export interface OrderItem {
  id: string;
  confirmed: boolean;
  data: {
    orderRefNumber: number;
    orderNumber: string;
    seller: string;
    orderedBy: string;
    rating: number | null;
    ratingId: string | null;
    isMarketRequest: boolean;
    detailsProps: {
      uri: string;
      name: string;
      price: string;
      tags: {
        label: string;
        type: string | 'plain' | 'blue';
      }[];
      weight: string;
      unit: string;
      size: string;
      location: string;
      vendor: string;
      cBorderRadius: string;
      cBorderWidth: string;
      pricePerUnit: string;
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
  term: string;
  dateFrom: moment.Moment | null;
  dateTo: moment.Moment | null;
};

export type TabOptions = 'Pending' | 'In Transit' | 'Complete';

export interface OrdersGeneratedProps {
  pendingOrders: {
    [index: string]: OrderItem[];
  };
  toShipOrders: {
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
  getCompletedOrders: () => void;
  toShipOrdersCount: string;
  completedOrdersCount: string;
  inTransitOrdersCount: string;
  filters: {
    toShipOrdersFilter: RequestFilters;
    completedOrdersFilter: RequestFilters;
    inTransitOrdersFilter: RequestFilters;
  };
  updateFilters: {
    updateToShipOrdersFilter: Dispatch<Partial<RequestFilters>>;
    updateCompletedOrdersFilter: Dispatch<Partial<RequestFilters>>;
    updateInTransitOrdersFilter: Dispatch<Partial<RequestFilters>>;
  };
  token: string;

  sendDispute: (orderId: string, message: string) => void;
  sendOrderRating: (
    orderId: string,
    rating: number,
    privateFeedback: string
  ) => void;
  isSendingDispute: boolean;
  isSendingOrderRating: boolean | null;
  isSendOrderRatingSuccess: boolean | null;
}

export type DateType = 'estCatchmentDate' | 'estDeliveryDate' | 'deliveredDate';
