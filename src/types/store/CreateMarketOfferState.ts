import { GenericResponse } from 'types/GenericResponse';

interface Size {
  from: string | null;
  to: string | null;
}

export type MarketOfferItem = {
  editId: string; // for internal state
  marketRequestId: string;
  sellerId: string;
  companyId: string;
  addressId: string;
  weight: number;
  price: number;
  stateOptions: string[];
  size: Size;
  deliveryDate: Date | null;
  listStateOptions?: string[];
  type?: string;
  image?: string;
  measurementUnit?: string;
};

export type CreateMarketOfferRequestData = {
  marketOffers: Omit<
    MarketOfferItem,
    'editId' | 'listStateOptions' | 'type' | 'image' | 'measurementUnit'
  >[];
};

export type CreateMarketOfferMeta = MarketOfferItem[];

export type CreateMarketOfferPayload = GenericResponse;
