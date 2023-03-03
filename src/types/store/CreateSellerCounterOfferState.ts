import { GenericResponse } from 'types/GenericResponse';

export type CreateSellerCounterOfferMeta = {
  negotiationRequestId: string;
  counterOffer: number;
  listingBoxId: string;
};

// TODO: Update response value
export type CreateSellerCounterOfferPayload = GenericResponse;
