import { GenericResponse } from 'types/GenericResponse';

export type UpdateUserMeta =
  | {
      firstName: string;
      lastName: string;
      email: string;
      mobile: string;
      company: { name: string; abn: string };
      companyId: string;
    }
  | {
      logo: File; // TODO: Update data type
      companyId: string;
    };

export type UpdateUserRequestData = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  company: { name: string; abn: string };
  companyId: string;
};

export type UpdateUserImageRequestData = {
  userId: string;
  logo: string;
  companyId: string;
};

export type UpdateUserPayload = GenericResponse;
