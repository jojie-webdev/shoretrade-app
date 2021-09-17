import { GenericResponse } from 'types/GenericResponse';

export type GetShippingQuoteMeta = {
  destination: {
    administrativeAreaLevel1: string;
    countryCode: string;
    level: string;
    locality: string;
    postcode: string;
    route: string;
    streetNumber: string;
    unitNumber: string;
  };
  sellers: Record<
    string,
    {
      id: string;
      boxes: { id: string; count: number; quantity: number; weight: number }[];
    }[]
  >;
};

export type GetShippingQuoteRequestData = {
  destination: {
    administrativeAreaLevel1: string;
    countryCode: string;
    level: string;
    locality: string;
    postcode: string;
    route: string;
    streetNumber: string;
    unitNumber: string;
  };
  listing: {
    id: string;
    boxes: { id: string; count: number; quantity: number; weight: number }[];
  }[];
};

export type GetShippingQuoteResponseItem = {
  success: boolean;
  quoteId: number;
  insuredValue: number;
  priceResult: {
    id: string;
    priceId: string;
    freightPrice: number;
    insurancePrice: number;
    consignmentFee: number;
    netPrice: number;
    gst: number;
    grossPrice: number;
    priceType: string;
    carrierName: string;
    serviceName: string;
    serviceCategory: string;
    shipmentMode: string; // ROAD
    minTransitTime: string; // yyyy-mm-dd
    maxTransitTime: string; // yyyy-mm-dd
    imageUrl: string;
    locationName: string;
    estimatedDate: string;
  }[];
};

export type GetShippingQuoteResponse = GenericResponse<{
  data: GetShippingQuoteResponseItem;
  token: string;
}>;

export type GetShippingQuotePayload = GenericResponse<
  Record<string, GetShippingQuoteResponseItem>
>;
