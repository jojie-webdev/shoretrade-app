import { GenericResponse } from 'types/GenericResponse';

export type GetBuyerOrdersMeta = {
  status?: 'PLACED' | 'TRANSIT' | 'DELIVERED';
  limit?: number;
  page?: string;
  dateFrom?: string;
  dateTo?: string;
};

export type GetBuyerOrdersResponseItem = {
  buyerCompanyId: string;
  buyerCompanyName: string;
  buyerEmployeeFirstName: string;
  buyerEmployeeLastName: string;
  buyerId: string;
  deliveryDate: string | null;
  deliveryInstruction: string | null;
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
  latestExpectedDeliveryDate: string | null;
  orderDate: string; // iso date string
  orderId: string;
  orderLineItem: {
    id: string;
    listing: {
      allowedWeightAdjustment: number;
      catchDate: string; // yyyy-mm-dd
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
      sizeFrom: string;
      sizeId: string;
      sizeTo: string;
      specifications: string[];
      typeId: string;
      typeName: string;
      unitKgConversion: number;
      weightConfirmed: boolean;
    };
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
  rating: string | null;
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
  totalPrice: string;
  weightConfirmed: boolean;
};

export type GetBuyerOrdersPayload = GenericResponse<{
  token: string;
  count: string;
  orders: GetBuyerOrdersResponseItem[];
}>;
