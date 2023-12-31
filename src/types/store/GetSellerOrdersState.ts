import { GenericResponse } from 'types/GenericResponse';

export type GetSellerOrdersMeta = {
  status?: 'PLACED' | 'TRANSIT' | 'DELIVERED';
  limit?: number;
  page?: string;
  term?: string;
  dateFrom?: Date | string;
  dateTo?: Date | string;
  orderId?: string;
  orderLineItemId?: string;
};

export type GetSellerOrdersResponseItem = {
  orderId: string;
  orderRefNumber: number;
  orderDate: string;
  buyerId: string;
  sellerId: string;
  shippingBookingNumber: number | null;
  shippingCost: number;
  shippingChargeNet: number;
  shippingChargeGst: number;
  originalExpectedDeliveryDate: string; // yyyy-mm-dd
  latestExpectedDeliveryDate: string | null;
  isMarketRequest: boolean;
  buyerCompanyName: string;
  buyerCompanyId: string;
  buyerEmployeeFirstName: string;
  buyerEmployeeLastName: string;
  sellerCompanyName: string;
  sellerCompanyId: string;
  fromAddress: {
    id: string;
    unitNumber: string;
    level: string;
    streetNumber: string;
    streetName: string;
    suburb: string;
    state: string;
    postcode: string;
    countryCode: string;
  };
  toAddress: {
    id: string;
    unitNumber: string;
    level: string | null;
    streetNumber: string;
    streetName: string;
    suburb: string;
    state: string;
    postcode: string;
    countryCode: string;
  };
  deliveryDate: string | null;
  deliveryOption: string;
  deliveryMethod: string;
  deliveryInstruction: {
    locationName: string;
    marketAddress: string;
    sellerDropOff: string;
    sellerDropOffAddress: string;
    isPartialShipped?: boolean;
  };
  sellerDropOffCutOffTime: null;
  status: string;
  totalPrice: string;
  weightConfirmed: boolean;
  ratingId: null;
  rating: null;
  orderLineItem: [
    {
      id: string;
      weight: number;
      price: number;
      listingBoxes: {
        id: string;
        count: number | null;
        weight: number;
        quantity: number;
      }[];
      shippingCost: number;
      shippingChargeNet: number;
      shippingChargeGst: number;
      shortWeightAdjustment: null;
      weightConfirmed: boolean;
      priceDelta: number | null;
      listing: {
        listingId: string;
        typeName: string;
        typeId: string;
        metricLabel: string;
        origin: {
          state: string;
          suburb: string;
          countryCode: string;
        };
        pricePerKilo: number;
        catchDate?: string; // yyyy-mm-dd string
        catchRecurrence?: string;
        description: string | null;
        fishermanFirstName: string;
        fishermanLastName: string;
        sizeId: string;
        sizeFrom: string | null;
        sizeTo: string | null;
        specifications: string[]; // specification names
        images: string[]; // image urls
        endDate: string; // iso date string
        isAquafuture: boolean;
        isPreAuction: boolean;
        allowedWeightAdjustment: number;
        measurementUnit: string;
        unitKgConversion: number;
        weightConfirmed: boolean;
        priceDelta: number | null;
        isIkeJime: boolean;
        isIceSlurry: boolean;
        isGSTIncluded: boolean;
        quality?: string;
      };
      scanHistory: ScanHistoryItem[];
    }
  ];
  dropOffDate: string;
  totalCrateFee?: number;
  transactionValueFeePercentage: number | null;
};

export type GetSellerOrdersPayload = GenericResponse<{
  token: string;
  count: string;
  orders: GetSellerOrdersResponseItem[];
  pendingOrders?: GetSellerOrdersResponseItem[];
}>;

export type SocketOrderScanPayload = {
  items: {
    id: string;
    status: OrderStatus;
    manifest_status: string;
    order_ref: string;
    name: string;
  }[];
  scan?: {
    updated_at: string;
    scan_option: string;
    scan_option_alias: string;
    user_role: string;
    user_role_alias: string;
  };
};

export type SocketOrderConfirmWeightPayload = {
  orderId: string;
  lineItemId: string;
};

export enum OrderStatus {
  DELIVERED = 'DELIVERED',
  IN_TRANSIT = 'TRANSIT',
  FOR_COLLECTION = 'FOR_COLLECTION',
  PLACED = 'PLACED',
}

export type ScanHistoryItem = {
  id: string;
  user_role: string;
  updated_at: string;
  scan_option: string;
  user_last_name: string;
  user_first_name: string;
  user_role_alias: string;
  scan_option_alias: string;
};
