import { GenericResponse } from 'types/GenericResponse';

export type DeclineNegotiationMeta = {
  negotiationRequestId: string;
  listingBoxId: string;
};

// TODO: Update response value
export type DeclineNegotiationPayload = GenericResponse;
