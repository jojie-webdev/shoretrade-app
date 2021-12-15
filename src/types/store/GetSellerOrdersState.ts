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
  deliveryInstruction: null;
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
      };
    }
  ];
  dropOffDate: string;
};

export type GetSellerOrdersPayload = GenericResponse<{
  token: string;
  count: string;
  orders: GetSellerOrdersResponseItem[];
  pendingOrders?: GetSellerOrdersResponseItem[];
}>;
