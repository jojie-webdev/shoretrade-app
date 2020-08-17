import { GenericResponse } from 'types/GenericResponse';

export type GetListingMeta = {
  listingId: string;
};

export type GetListingResponseItem = {
  id: string;
  type: string;
  typeId: string;
  coop: {
    name: string;
    image: string;
    id: string;
    rating: string; // '5.0'
  };
  fisherman: { id: string; name: string };
  size: {
    from: string;
    to: string;
    unit: string; // Grams
  };
  price: string;
  origin: { state: string; suburb: string; countryCode: string };
  description: string;
  caught: string; // yyyy-mm-dd
  ends: string;
  createdAt: string;
  state: string[]; // ['Live', 'Wild', 'Whole'];
  images: string[];
  minimumOrder: string; // '1.0'
  sellInMultiplesOf: boolean;
  remaining: number;
  average: number;
  isAquafuture: boolean;
  allowedWeightAdjustment: number;
  isFavourite: boolean;
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
};

export type GetListingPayload = GenericResponse<{
  listing: GetListingResponseItem[];
}>;