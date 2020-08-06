import { GenericResponse } from 'types/GenericResponse';

export type AddCardTokenMeta = {
  companyId: string;
  default: boolean;
  card: {
    number: number;
    exp_month: string;
    exp_year: string;
    cvc: number;
    name: string;
  };
};

export type AddCardTokenRequestData = {
  default: boolean;
  token: string;
  companyId: string;
};

export type AddCardTokenPayload = GenericResponse;
