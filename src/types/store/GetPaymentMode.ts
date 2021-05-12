import { GenericResponse } from 'types/GenericResponse';

export type GetPaymentModeMeta = {};

export interface PaymentMode {
  id: string;
  label:
    | 'CREDIT_CARD'
    | 'BANK_TRANSFER'
    | 'EFT'
    | 'CHEQUE'
    | 'CASH_DEPOSIT'
    | 'CREDIT_ADJ'
    | 'ACCT_CRED'
    | 'FINANCING'
    | 'BUYNOW_PAYLATER'
    | string;
}

export type GetPaymentModePayload = GenericResponse<{
  token: string;
  payment_mode: PaymentMode[];
}>;
