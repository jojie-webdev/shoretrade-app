import { GenericResponse } from 'types/GenericResponse';

export type UpdateBankDetailsMeta = {
  bsb: string;
  accountName: string;
  accountNumber: string;
  companyId: string;
};

export type UpdateBankDetailsRequestData = {
  bankAccount: {
    bsb: string;
    accountName: string;
    accountNumber: string;
  };
  companyId: string;
  userId: string;
};

export type UpdateBankDetailsPayload = GenericResponse;
