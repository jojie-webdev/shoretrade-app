import { GenericResponse } from 'types/GenericResponse';

export type SendDisputeMeta = {
  message: string;
  orderId: string;
};

export type SendDisputePayload = GenericResponse;
