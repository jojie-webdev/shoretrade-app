import { GenericResponse } from 'types/GenericResponse';

export type UpdateListingMeta = {};

export type UpdateListingRequestData = {
  companyId: string;
  listingId: string;
  images: { url: string; requirementId: string }[];
  price: number;
  catchDate: string | null; // date iso string
  catchRecurrence: string | null;
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
  packaging?: {
    id?: string;
    custom?: {
      width: number;
      height: number;
      length: number;
      airlineApproved?: boolean;
    };
  };
  quality: string | null;
};

export type UpdateListingPayload = GenericResponse;
