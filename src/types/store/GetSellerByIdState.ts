import { GenericResponse } from 'types/GenericResponse';

export type Seller = {
  id: string;
  companyName: string;
  companyImage: string;
  companyLocation: {
    suburb: string;
    state: string;
    countryCode: string;
  };
  rating: string | number;
  listings?: Array<any>;
  listing_count: number;
  isFavourite?: boolean;
};

export type GetSellerByIdMeta = {
  sellerId: string;
  preload?: boolean;
};

export type GetSellerByIdPayload = GenericResponse<{
  token: string;
  seller: Seller;
}>;
