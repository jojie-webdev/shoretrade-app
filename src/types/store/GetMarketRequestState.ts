import { GenericResponse } from 'types/GenericResponse';

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
  offers: number;
};

export type GetPaymentMethodsPayload = GenericResponse<{
  token: string;
  data: {
    marketRequests: GetMarketRequestResponseItem[];
  };
}>;
