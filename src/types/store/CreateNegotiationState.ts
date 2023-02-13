import { GenericResponse } from 'types/GenericResponse';

export type CreateNegotiationMeta = {
  listingId: string;
  listingBoxId: string;
  desiredQuantity: string;
  counterOffer: string;
};

// TODO: Update response value
export type CreateNegotiationPayload = GenericResponse;
