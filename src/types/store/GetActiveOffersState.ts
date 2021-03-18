import { GenericResponse } from 'types/GenericResponse';

export type GetActiveOffersMeta = {
  queryParams?: Record<string, string>;
};

export type GetActiveOffersRequestResponseItem = {
  id: string;
  status: 'OPEN' | 'ACCEPTED' | 'DECLINE' | 'CLOSED';
  createdAt: string;
  price: number;
  weight: number;
  image: string;
  name: string;
  measurementUnit: string;
  marketRequest: {
    id: string;
    status: 'OPEN' | 'CLOSED';
    createdAt: string;
    averagePrice: number;
  };
  size: {
    from?: string;
    to?: string;
  };
  specifications: Array<string>;
  company: {
    id: string;
    name: string;
    rating: number;
    image: string;
    address: {
      state: string;
      countryCode: string;
    };
  };
  negotiations: Array<{
    id: string;
    market_offer_id: string;
    price: number;
    type: 'NEW_OFFER' | 'COUNTER_OFFER';
    is_accespted: boolean;
    created_at: string;
    updated_at: string;
  }>;
  offers: Array<Offer>;
};

export interface Offer {
  id: string;
  status: string;
  createdAt: string;
  price: number;
  weight: number;
  size: Size;
  measurementUnit: string;
  specifications: string[];
  negotiations: any[];
}

export interface Negotiation {
  id: string;
  type: string;
  price: number;
  created_at: string;
  updated_at: string;
  is_accepted: boolean;
  market_offer_id: string;
}

interface Size {
  from?: string;
  to?: any;
}

export interface NegotiateOfferMeta {
  marketOfferId: string;
  price: number;
  accepted?: boolean;
}

export type GetActiveOffersPayload = GenericResponse<{
  token: string;
  marketOffers: GetActiveOffersRequestResponseItem[];
}>;

export type NegotiatePayload = GenericResponse;
