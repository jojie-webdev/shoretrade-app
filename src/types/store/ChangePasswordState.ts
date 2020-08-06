import { GenericResponse } from 'types/GenericResponse';

export type ChangePasswordMeta = {
  oldPassword: string;
  newPassword: string;
};

export type ChangePasswordPayload = GenericResponse;
