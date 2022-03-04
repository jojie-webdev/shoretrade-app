import { GetTransactionHistoryResponseItem } from 'types/store/GetTransactionHistoryState';

export interface PaymentHistoryGeneratedProps {
  transactions: GetTransactionHistoryResponseItem[];
  isLoading: boolean;
}
