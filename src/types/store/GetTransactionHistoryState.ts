import { GenericResponse } from 'types/GenericResponse';

export type GetTransactionHistoryMeta = {
  companyId: string;
};

export type GetTransactionHistoryResponseItem = {
  orderId: string;
  description: string;
  adjustmentAmount: number;
  balance: number;
  createdAt: string;
};

export type GetTransactionHistoryPayload = GenericResponse<{
  token: string;
  transactions: GetTransactionHistoryResponseItem[];
}>;
