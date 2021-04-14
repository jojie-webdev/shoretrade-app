import { GenericResponse } from 'types/GenericResponse';

export type UpdateListingMeta = {};

export type UpdateListingRequestData = {
  companyId: string;
  listingId: string;
  images: { url: string; requirementId: string }[];
  price: number;
  catchDate: string | null; // date iso string
  description: string;
  origin: {
    suburb: string;
    state: string;
    countryCode: string;
  };
  boxes: {
    id: string;
    weight: number;
    quantity: number;
    count?: number;
  }[];
  ends: string | null; // date iso string
  addressId: string;
  minOrder: number;
};

export type UpdateListingPayload = GenericResponse;
