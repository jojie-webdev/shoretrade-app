import { GenericResponse } from 'types/GenericResponse';

export type GetPaymentMethodsMeta = {
  companyId: string;
};

export type GetPaymentMethodsResponseItem = {
  brand: string; // Ex. 'Visa'
  expMonth: number;
  expYear: number;
  id: string;
  lastFour: string;
  name: string;
};

export type GetPaymentMethodsPayload = GenericResponse<{
  token: string;
  data: {
    cards: GetPaymentMethodsResponseItem[];
    defaultCard: string;
    id: string; // stripe customer id
  };
}>;
