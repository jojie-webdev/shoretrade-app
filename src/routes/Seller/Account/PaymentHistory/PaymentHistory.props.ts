import { GetTransactionHistoryResponseItem } from 'types/store/GetTransactionHistoryState';

export interface PaymentHistoryGeneratedProps {
  subscriptionPlan: string;
  transactions: GetTransactionHistoryResponseItem[];
  isLoading: boolean;
  token: string;
}
