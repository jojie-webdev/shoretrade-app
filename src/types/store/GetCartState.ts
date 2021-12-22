import { GenericResponse } from 'types/GenericResponse';

export type GetCartMeta = {
  employeeId: string;
};

export type GetCartListingDataItem = {
  id: string;
  type: string;
  fisherman: { id: string; name: string };
  metric: string;
  sizeFrom: string;
  sizeTo: string;
  price: string;
  origin: { state: string; suburb: string; countryCode: string };
  caught?: string; // yyyy-mm-dd
  ends?: string;
  catchRecurrence?: string;
  specifications: string; // ['Live', 'Wild', 'Whole'];
  image: string;
  minimumOrder: string; // '1.0'
  sellInMultiplesOf: boolean;
  remaining: number;
  average: number;
  isAquafuture: boolean;
  allowedWeightAdjustment: number;
  address: {
    id: string;
    streetNumber: string;
    streetName: string;
    suburb: string;
    state: string;
    postcode: string;
    countryCode: string;
  };
  measurementUnit: string;
  packagingId: string | null;
  isIkeJime?: boolean;
  isIceSlurry?: boolean;
  quality?: string;
};

export type GetCartDataItem = {
  cartItemId?: string;
  companyName: string; // Seller
  companyId: string; // Seller
  listing: GetCartListingDataItem;
  orderBoxes: {
    id: string;
    weight: number;
    quantity: number;
    count: number;
  }[];
  subTotal: number;
  weight: number;
};

export type GetCartData = {
  id: string;
  lastModified: string; // iso date string
  items: Record<string, GetCartDataItem>;
  timer: {
    expiry: number;
    warning: number;
  };
};

export type GetCartPayload = {
  message: string;
  data: null | GetCartData;
};
