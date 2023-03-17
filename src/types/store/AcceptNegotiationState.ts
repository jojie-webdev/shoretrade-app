import { GenericResponse } from 'types/GenericResponse';

export interface Box {
  count: number | null;
  id: string;
  quantity: number | null;
  weight: number;
}

export type AcceptNegotiationMeta = {
  negotiationRequestId: string;
  listingBoxes: Box[];
};

// TODO: Update response value
export type AcceptNegotiationPayload = GenericResponse;
