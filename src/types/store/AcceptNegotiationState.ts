import { GenericResponse } from 'types/GenericResponse';

export type AcceptNegotiationMeta = {
  negotiationRequestId: string;
  listingBoxId: string;
};

// TODO: Update response value
export type AcceptNegotiationPayload = GenericResponse;
