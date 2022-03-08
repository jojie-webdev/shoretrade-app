import { GetTransactionHistoryResponseItem } from 'types/store/GetTransactionHistoryState';

export interface BalanceHistoryGeneratedProps {
  transactions: GetTransactionHistoryResponseItem[];
  isLoading: boolean;
  redirectFrom: {
    label: string;
    link: string;
  };
}
