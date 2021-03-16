import { GenericResponse } from 'types/GenericResponse';

export type MarketOfferItem = {
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
interface Size {
  from: string | null;
  to: string | null;
}

export type EditableMarketOffer = Partial<MarketOfferItem> & {
  isEdit: boolean;
  marketOfferId?: string;
};

export interface AcceptOffer {
  marketOfferId: string;
  marketNegotiationId: string;
  marketRequestId: string;
}

export interface DeclineOffer {
  marketOfferId: string;
  marketRequestId: string;
}

export interface NegotiateOffer {
  marketOfferId: string;
  marketRequestId: string;
  price: number;
  closeOnAccept: boolean;
}

export type OffersPayload = { marketOffers: MarketOfferItem[] };
export type MarketOfferPayload = MarketOfferItem | { id: string };
export type MarketOfferState = Record<string, MarketOfferItem>;
export type NegotiationPayload = GenericResponse;
