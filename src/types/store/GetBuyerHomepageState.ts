import { GenericResponse } from 'types/GenericResponse';

// eslint-disable-next-line @typescript-eslint/ban-types
export type GetBuyerHomepageMeta = {};

export type GetBuyerHomepageRequestData = {
  addressId: string;
};

export type GetBuyerHomepageResponseListingItem = {
  id: string;
  type: string;
  typeId: string;
  coop: {
    name: string;
    id: string;
  };
  fisherman: { id: string; name: string };
  size: {
    from: string;
    to: string;
    unit: string; // Grams
  };
  price: string;
  origin: { state: string; suburb: string; countryCode: string };
  shippingFrom: { state: string; suburb: string; countryCode: string };
  description: string;
  caught?: string; // yyyy-mm-dd
  ends?: string;
  catchRecurrence?: string;
  createdAt: string;
  state: string[]; // ['Live', 'Wild', 'Whole'];
  images: string[];
  minimumOrder: string; // '1.0'
  sellInMultiplesOf: boolean;
  remaining: number;
  average: number;
  isAquafuture: boolean;
  isFavourite: boolean;
  depot: {
    id: string;
    suburb: string;
    postcode: string;
    countryCode: string;
    cutOffTime: string;
  };
  measurementUnit: string;
  isIkeJime: boolean;
  isIceSlurry: boolean;
  quality?: string;
};

export type GetBuyerHomepagePayload = GenericResponse<{
  token: string;
  data: {
    bannerData: {
      app: string[];
      web: string[];
    };
    categories: {
      id: string;
      name: string;
      sortIndex: number;
      thumbnail: string;
    }[];
    favouriteListing: GetBuyerHomepageResponseListingItem[];
    favouriteSellers: {
      companyImage: string;
      companyName: string;
      id: string;
    }[];
    recentListing: GetBuyerHomepageResponseListingItem[];
    sellers: {
      companyImage: string;
      companyName: string;
      id: string;
    }[];
  };
}>;
