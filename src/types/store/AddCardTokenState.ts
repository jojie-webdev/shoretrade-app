import { GenericResponse } from 'types/GenericResponse';

export type AddCardTokenMeta = {
  companyId: string;
  default: boolean;
  card: {
    number: number;
    exp_month: number;
    exp_year: number;
    cvc: string;
    name: string;
  };
};

export type AddCardTokenRequestData = {
  default: boolean;
  token: string;
  companyId: string;
};

export type AddCardTokenPayload = GenericResponse;
