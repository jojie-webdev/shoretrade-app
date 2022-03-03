import { GenericResponse } from 'types/GenericResponse';
import { UploadBulkState } from 'types/store/UploadBulkState';

export type CreateBulkListingMeta = {
  shippingAddress: string;
  data: UploadBulkState[];
};

export type CreateBulkListingRequestData = {
  employee: string;
  type: string;
  states: string[];
  isUngraded: boolean;
  sizeFrom: string | null;
  sizeTo: string | null;
  images: { url: string; requirementId: string }[];
  pricePerKilo: number;
  boxes: {
    id: string;
    weight: number;
    quantity: number;
    count?: number;
  }[];
  minOrder: number;
  sellInMultiplesOfMinOrder?: boolean;
  catchDate: string | null; // date iso string
  description: string;
  origin: {
    suburb: string;
    state: string;
    countryCode: string;
  };
  ends: string | null; // date iso string
  isAquafuture: boolean;
  addressId: string;
  isPreAuctionSale: boolean;
  isAuctionSale: boolean;
  auctionDate: string | null;
};

export type CreateBulkListingPayload = GenericResponse;
