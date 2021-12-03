import { GenericResponse } from 'types/GenericResponse';

export type PlaceOrderMeta = {
  orderId: string;
  buyerCompanyId: string;
  buyerId: string;
  deliveryMethod: string; // 'ROAD'
  deliveryOption: string; // 'DEPOT'
  fromAddressId: string;
  isPartial: boolean;
  orderLineItem: {
    id: string;
    listing: {
      allowedWeightAdjustment: number;
      catchDate?: string; // yyyy-mm-dd
      catchRecurrence?: string;
      description: string | null;
      endDate?: string; // date iso string
      fishermanFirstName: string;
      fishermanLastName: string;
      images: string[];
      isAquafuture: boolean;
      listingId: string;
      measurementUnit: string; // ex. 'kg'
      metricLabel: string;
      origin: { state: string; suburb: string; countryCode: string };
      priceDelta: number | null;
      pricePerKilo: number;
      sizeFrom: string | null;
      sizeId: string;
      sizeTo: string | null;
      specifications: string[]; // ["Frozen", "Cleaned", "Tenderised"]
      typeId: string;
      typeName: string;
      unitKgConversion: number;
      weightConfirmed: boolean;
    };
    listingBoxes: {
      id: string;
      count: number | null;
      weight: number;
      quantity: number;
    }[];
    price: number;
    priceDelta: number | null;
    weight: number;
    weightConfirmed: boolean;
  }[];
  sellerCompanyId: string;
  sellerId: string;
  toAddressId: string;
  shippingDate: string;
};

export type PlaceOrderPayload = GenericResponse & {
  orderId: string;
};
