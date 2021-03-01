import { GenericResponse } from 'types/GenericResponse';

export type GetActiveOffersMeta = {
  queryParams?: Record<string, string>;
};

export type GetActiveOffersRequestResponseItem = {
  id: string;
  status: 'ACCEPTED' | 'DECLINE';
  createdAt: string;
  price: number;
  weight: number;
  image: string;
  name: string;
  marketRequest: {
    id: string;
    status: 'OPEN' | 'CLOSED';
    createdAt: string;
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
};

export type GetActiveOffersPayload = GenericResponse<{
  token: string;
  marketOffers: GetActiveOffersRequestResponseItem[];
}>;
