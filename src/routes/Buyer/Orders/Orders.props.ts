import { Dispatch, SetStateAction } from 'react';

import moment from 'moment';
import { FocusedInputShape } from 'react-dates';
import { ScanHistoryItem } from 'types/store/GetSellerOrdersState';

export interface OrderItem {
  id: string;
  confirmed: boolean;
  data: {
    isPending: boolean;
    isCollectable: boolean;
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
      scanHistory: ScanHistoryItem[];
    }[];
    shippingOption: string;
    shippingPrice: string;
    shippingTo: string;
    shippingFrom: string;
    shippingAddress?: string;
    shippingChargeGst: number;
    shippingChargeNet: number;
    total: string;
    totalTransactionFee: number | null;
    transactionValueFeePercentage: number | null;
    totalCrateFee: number;
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
  pendingOrders: PendingOrder[];
  toShipOrders: GroupedOrderItemData[];
  inTransitOrders: GroupedOrderItemData[];
  completedOrders: GroupedOrderItemData[];
  currentTab: TabOptions;
  onChangeCurrentTab: (newTab: TabOptions) => void;
  loadingCurrentTab: boolean;
  getAllOrders: () => void;
  getCompletedOrders: () => void;
  toShipOrdersCount: number;
  completedOrdersCount: number;
  inTransitOrdersCount: number;
  selectionCount: number;
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

export type OrderGroupDetails = {
  groupName: string;
  groupKey: string;
  deliveryMethod: string;
  deliveryMethodLabel: string;
  deliveryAddress: string | null;
  collectableCount: number;
};

export type PendingOrder = OrderGroupDetails & {
  buyerId: string;
  orderCount: number;
  orders: OrderItem[];
};

export type OrderItemData = OrderGroupDetails &
  OrderItem & {
    id: string;
    date: Date;
    type?: string;
    orderRefNumber: number;
  };

export type GroupedOrderItemData = {
  title: string;
  data: { [p: string]: OrderItemData[] };
  orderTotal: number;
};
