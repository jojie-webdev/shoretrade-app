import { GenericResponse } from 'types/GenericResponse';

export type GetActiveOffersMeta = {
  queryParams?: Record<string, any>;
};

export type GetActiveOffersRequestResponseItem = {
  id: string;
  status: 'OPEN' | 'ACCEPTED' | 'DECLINED' | 'CLOSED';
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
  negotiations: Negotiations[];
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

export interface Negotiations {
  id: string;
  market_offer_id: string;
  price: number;
  type: 'NEW_OFFER' | 'COUNTER_OFFER';
  is_accepted: boolean;
  created_at: string;
  updated_at: string;
  ordinal?: number;
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
  count: number;
  marketOffers: GetActiveOffersRequestResponseItem[];
}>;

export type NegotiatePayload = GenericResponse;
