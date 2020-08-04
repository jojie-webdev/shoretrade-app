import { GenericResponse } from 'types/GenericResponse';

export type UpdateListingMeta = {};

export type UpdateListingRequestData = {
  companyId: string;
  listingId: string;
  images: { url: string; requirementId: string }[];
  pricePerKilo: number;
  catchDate: string | null; // date iso string
  description: string;
  origin: {
    suburb: string;
    state: string;
    countryCode: string;
  };
  ends: string | null; // date iso string
  addressId: string;
};

export type UpdateListingPayload = GenericResponse;
