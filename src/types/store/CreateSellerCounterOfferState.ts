import { GenericResponse } from 'types/GenericResponse';

interface Box {
  count: number | null;
  id: string;
  quantity: number | null;
  weight: number;
}

export type CreateSellerCounterOfferMeta = {
  negotiationRequestId: string;
  counterOffer: number;
  listingBoxes: Box[];
};

// TODO: Update response value
export type CreateSellerCounterOfferPayload = GenericResponse;
