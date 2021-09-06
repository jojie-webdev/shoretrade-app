import { GenericResponse } from 'types/GenericResponse';

import { Offer } from './GetActiveOffersState';

export type GetPaymentMethodsMeta = {
  companyId: string;
};

export type GetMarketRequestResponseItem = {
  id: string;
  buyerId: string;
  type: string;
  image: string;
  status: string;
  createdAt: string;
  offers: Offer[];
};

export type GetPaymentMethodsPayload = GenericResponse<{
  token: string;
  data: {
    marketRequests: GetMarketRequestResponseItem[];
  };
}>;
