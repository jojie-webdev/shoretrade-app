import { GenericResponse } from 'types/GenericResponse';

export type GetBankDetailsMeta = {
  companyId: string;
};

export type GetBankDetailsPayload = GenericResponse<{
  token: string;
  bankDetails: {
    bsb: string;
    accountNumber: string;
    accountName: string;
  };
}>;
