import { GenericResponse } from 'types/GenericResponse';

export type ResetPasswordMeta = {
  email: string;
  code: string;
  password: string;
  isBarcode?: boolean;
};

export type ResetPasswordPayload = GenericResponse;
