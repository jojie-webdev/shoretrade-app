import { GenericResponse } from 'types/GenericResponse';

export type SendMessageMeta = {
  message: string;
  buyerId: string; // employee id
};

export type SendMessagePayload = GenericResponse;
