import { GenericResponse } from 'types/GenericResponse';

type Subscription = {
  name: string;
  alias: string;
  end_date: string;
  start_date: string;
  price_per_month: number;
}

type Metadata = {
  subscriptions: Subscription[];
}

export type GetTransactionHistoryMeta = {
  companyId: string;
};

export type GetTransactionHistoryResponseItem = {
  orderId: string;
  description: string;
  adjustmentAmount: number;
  balance: number;
  createdAt: string;
  refNumber: number;
  metadata: Metadata;
};

export type GetTransactionHistoryPayload = GenericResponse<{
  token: string;
  transactions: GetTransactionHistoryResponseItem[];
}>;
