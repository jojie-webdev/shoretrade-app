import { GenericResponse } from 'types/GenericResponse';

import { ShippingTo } from './GetAllMarketRequestState';

export type GetActiveOffersMeta = {
  queryParams?: Record<string, any>;
};

export enum OfferStatus {
  ACCEPTED = 'ACCEPTED',
  PARTIAL = 'PARTIAL',
  PAYMENT_MISSED = 'PAYMENT MISSED',
  DECLINED = 'DECLINED',
  PAYMENT_REQUIRED = 'PAYMENT REQUIRED',
  PENDING_PAYMENT = 'PENDING PAYMENT',
  NEW_OFFER = 'NEW OFFER',
  NEGOTIATION = 'NEGOTIATION',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
  FINALISED = 'FINALISED',
}

export type ShippingAddress = {
  country_code: string;
  depot_address_id: string;
  flat_delivery_fee: string;
  id: string;
  level: string;
  postcode: string;
  state: string;
  street_name: string;
  street_number: string;
  suburb: string;
  unit_number: string;
};

export type OfferMarketRequest = {
  id: string;
  status: 'OPEN' | 'CLOSED';
  createdAt: string;
  averagePrice: number;
  image: string;
  shippingTo: ShippingTo;
  weight: { from: number; to: number };
  name: string;
};

export type GetActiveOffersRequestResponseItem = {
  id: string;
  status: OfferStatus;
  statusText: string;
  createdAt: string;
  deliveryDate?: string;
  price: number;
  weight: number;
  image: string;
  name: string;
  metric: string;
  measurementUnit: string;
  marketRequest: OfferMarketRequest;
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
  shippingTo: ShippingAddress;
  shippingFrom: ShippingAddress;
  paymentRequired: boolean;
  orderRefNumber: number;
};

export interface Offer {
  id: string;
  status: string;
  createdAt: string;
  statusText: string;
  price: number;
  weight: number;
  expiryDate: string;
  size: Size;
  measurementUnit: string;
  specifications: string[];
  negotiations: Negotiations[];
  deliveryDate: string;
  metric: string;
  company_id: string;
  shippingFrom: ShippingAddress;
  paymentRequired: boolean;
  orderRefNumber: number;
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
