import { GenericResponse } from 'types/GenericResponse';

export type GetBuyerOrdersMeta = {
  status?: 'PLACED' | 'TRANSIT' | 'DELIVERED';
  term?: string;
  page?: string;
  limit?: number;
  dateFrom?: Date | string;
  dateTo?: Date | string;
};

export type ListingResponseItem = {
  allowedWeightAdjustment: number;
  catchDate?: string; // yyyy-mm-dd
  catchRecurrence?: string;
  description: string;
  endDate: string; // iso date string
  fishermanFirstName: string;
  fishermanLastName: string;
  images: string[];
  isAquafuture: boolean;
  listingId: string;
  measurementUnit: string; // ex. 'kg'
  metricLabel: string; // ex. 'Grams'
  origin: {
    countryCode: string;
    state: string;
    suburb: string;
  };
  priceDelta: number | null;
  pricePerKilo: number;
  sizeFrom: string | null;
  sizeId: string;
  sizeTo: string | null;
  specifications: string[];
  typeId: string;
  typeName: string;
  unitKgConversion: number;
  weightConfirmed: boolean;
  isIkeJime: boolean;
  isIceSlurry: boolean;
  quality?: string;
};

export type GetBuyerOrdersResponseItem = {
  buyerCompanyId: string;
  buyerCompanyName: string;
  buyerEmployeeFirstName: string;
  buyerEmployeeLastName: string;
  buyerId: string;
  deliveryDate: string | null;
  deliveryInstruction: {
    locationName: string;
    marketAddress: string;
    sellerDropOff: string;
    sellerDropOffAddress: string;
  };
  deliveryMethod: string; // ROAD
  deliveryOption: string; // DOOR
  fromAddress: {
    countryCode: string;
    id: string;
    level: string | null;
    postcode: string;
    state: string;
    streetName: string;
    streetNumber: string;
    suburb: string;
    unitNumber: string | null;
  };
  isMarketRequest: boolean;
  latestExpectedDeliveryDate: string | null;
  orderDate: string; // iso date string
  orderId: string;
  orderLineItem: {
    id: string;
    listing: ListingResponseItem;
    listingBoxes: {
      count: number | null;
      id: string;
      quantity: number;
      weight: number;
    }[];
    price: number;
    priceDelta: number | null;
    shippingChargeGst: number;
    shippingChargeNet: number;
    shippingCost: number;
    shortWeightAdjustment: number | null;
    weight: number;
    weightConfirmed: boolean;
  }[];
  orderRefNumber: number;
  originalExpectedDeliveryDate: string; // yyyy-mm-dd
  rating: number | null;
  ratingId: string | null;
  sellerCompanyId: string;
  sellerCompanyName: string;
  sellerDropOffCutOffTime: string | null;
  sellerId: string;
  shippingBookingNumber: string | null;
  shippingChargeGst: number;
  shippingChargeNet: number;
  shippingCost: number;
  status: string;
  toAddress: {
    countryCode: string;
    id: string;
    level: string | null;
    postcode: string;
    state: string;
    streetName: string;
    streetNumber: string;
    suburb: string;
    unitNumber: string | null;
  };
  totalCrateFee?: number;
  totalPrice: string;
  weightConfirmed: boolean;
};

export type GetBuyerOrdersPayload = GenericResponse<{
  token: string;
  count: string;
  orders: GetBuyerOrdersResponseItem[];
  pendingOrders: GetBuyerOrdersResponseItem[];
}>;
