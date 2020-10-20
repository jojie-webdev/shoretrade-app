import { GenericResponse } from 'types/GenericResponse';

export type SendMessageMeta = {
  message: string;
  buyerId: string;
};

export type SendMessagePayload = GenericResponse;
