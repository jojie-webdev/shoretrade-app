import { GenericResponse } from 'types/GenericResponse';

export type SendMessageMeta = {
  message: string;
  buyerId: string; // employee id
  orderRefNumber: string;
};

export type SendMessagePayload = GenericResponse;
