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
  isFavourite?: boolean;
};

export type GetSellerByIdMeta = {
  sellerId: string;
};

export type GetSellerByIdPayload = GenericResponse<{
  token: string;
  seller: Seller;
}>;
