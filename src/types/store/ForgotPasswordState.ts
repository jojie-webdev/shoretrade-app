import { GenericResponse } from 'types/GenericResponse';

export type ForgotPasswordMeta = {
  email: string;
};

export type ForgotPasswordRequestData = {
  email?: string;
  mobile?: string;
  service: 'EMAIL' | 'MOBILE';
};

export type ForgotPasswordPayload = GenericResponse;
