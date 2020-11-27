import { GenericResponse } from 'types/GenericResponse';

export type ResetPasswordMeta = {
  email: string;
  code: string;
  password: string;
};

export type ResetPasswordPayload = GenericResponse;
