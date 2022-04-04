import { GenericResponse } from 'types/GenericResponse';

// eslint-disable-next-line @typescript-eslint/ban-types
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
  auctionDate: string | null;
  isAquafuture: boolean;
  isPreAuctionSale: boolean;
  isAuctionSale: boolean;
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
  isIkeJime: boolean;
  isIceSlurry: boolean;
  templateDeliveryDate: string | null;
  isForSaleRepPhoto: boolean;
  isActualPhoto: boolean;
  hasNoSelectedType: boolean;
  restrictToState?: boolean;
};

export type UpdateListingPayload = GenericResponse;
