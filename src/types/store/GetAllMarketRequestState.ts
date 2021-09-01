import { GenericResponse } from 'types/GenericResponse';

import { Offer } from './GetActiveOffersState';

export type GetAllMarketRequestMeta = {
  queryParams?: string;
};

export type GetAllMarketRequestResponseItem = {
  id: string;
  buyerId: string;
  type: string;
  typeId: string;
  image: string;
  status: string;
  shippingTo: ShippingTo;
  offers: Offer[];
  size: {
    from: string;
    options: any;
    to: string;
    ungraded: boolean;
  };
  paymentRequired: boolean;
  sizeFrom?: number;
  sizeTo?: number;
  sizeUngraded: boolean;
  sizeOptions: [];
  createdAt: string;
  specifications?: Specification[];
  specs?: string[];
  weight?: Weight;
  metric: string;
  measurementUnit: string;
};

interface Specification {
  stateId: string;
  stateName: string;
  stateGroup: number;
}

interface Weight {
  from: number;
  to: number;
}

export interface ShippingTo {
  id: string;
  state: string;
  suburb: string;
  country_code: string;
  unit_number: string;
  level: string;
  street_number: string;
  street_name: string;
  postcode: string;
}

export type GetAllMarketRequestPayload = GenericResponse<{
  token: string;
  marketRequests: GetAllMarketRequestResponseItem[];
}>;
