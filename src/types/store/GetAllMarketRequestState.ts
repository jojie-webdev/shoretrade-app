import { GenericResponse } from 'types/GenericResponse';

export type GetAllMarketRequestMeta = {
  queryParams?: Record<string, any>;
};

export type GetAllMarketRequestResponseItem = {
  id: string;
  buyerId: string;
  type: string;
  typeId: string;
  image: string;
  status: string;
  shippingTo: ShippingTo;
  offers: string;
  sizeFrom?: number;
  sizeTo?: number;
  sizeUngraded: boolean;
  sizeOptions: [];
  createdAt: string;
  specifications: Specification[];
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
