import { GenericResponse } from 'types/GenericResponse';

export interface Box {
  count: number | null;
  id: string;
  quantity: number | string | null;
  weight: number | string;
}

export type CreateNegotiation_2Meta = {
  listingId: string;
  listingBoxes: Box[];
  counterOffer: string;
};

// TODO: Update response value
export type CreateNegotiation_2Payload = GenericResponse;
