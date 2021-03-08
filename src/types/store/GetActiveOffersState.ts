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
  offers: Array<{
    id: string;
    negotiations: any[];
    price: number;
    type: 'NEW_OFFER' | 'COUNTER_OFFER';
    size: { from: string; to: string };
    created_at: string;
    specifications: string[];
    status: string;
    weight: number;
    measurementUnit: string;
  }>;
};

export type GetActiveOffersPayload = GenericResponse<{
  token: string;
  marketOffers: GetActiveOffersRequestResponseItem[];
}>;
