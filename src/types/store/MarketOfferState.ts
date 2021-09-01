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
  marketOfferId?: string;
  marketNegotiationId?: string;
  id?: string;
};

export type AcceptOfferItem = {
  marketOfferId: string;
  marketNegotiationId: string;
  marketRequestId: string;
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
  cardToken?: string;
  existingCard?: string;
  card?: {
    number: number;
    exp_month: string;
    exp_year: string;
    cvc: number;
    name: string;
  };
  default?: boolean;
  paymentMode?: string;
}

export interface DeclineOffer {
  marketOfferId: string;
  marketRequestId: string;
}

export interface NegotiateOffer {
  marketOfferId: string;
  marketRequestId: string;
  price: number;
  closeOnAccept?: boolean;
}

export type OffersPayload = { marketOffers: MarketOfferItem[] };
export type MarketOfferPayload = MarketOfferItem | { id: string };
export type AcceptOfferPayload = AcceptOfferItem | { id: string };
export type MarketOfferState = Record<string, AcceptOfferItem>;
export type NegotiationPayload = GenericResponse;
