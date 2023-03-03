import { GenericResponse } from 'types/GenericResponse';

export type GetNegotiationCreditMeta = {
  // TODO: Add request values
};

export type GetNegotiationCreditRequestResponseItem = {
  credit: number;
  is_active: boolean;
  is_unlimited: boolean;
};

// TODO: Update response value
export type GetNegotiationCreditPayload =
  GenericResponse<GetNegotiationCreditRequestResponseItem>;
