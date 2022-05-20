import { GetTransactionHistoryResponseItem } from 'types/store/GetTransactionHistoryState';

export interface BalanceHistoryGeneratedProps {
  transactions: GetTransactionHistoryResponseItem[];
  isLoading: boolean;
  isPlanView?: boolean;
  redirectFrom: {
    label: string;
    link: string;
  };
  token: string;
}
