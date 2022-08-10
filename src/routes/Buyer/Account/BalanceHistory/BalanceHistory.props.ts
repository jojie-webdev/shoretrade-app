import { GetTransactionHistoryResponseItem } from 'types/store/GetTransactionHistoryState';

export interface BalanceHistoryGeneratedProps {
  transactions: GetTransactionHistoryResponseItem[];
  subscriptionPlan: string;
  isLoading: boolean;
  isPlanView?: boolean;
  redirectFrom: {
    label: string;
    link: string;
  };
  token: string;
  onFileIconClick: (
    isCreditCardTopUp: boolean,
    refNumber: number,
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}
