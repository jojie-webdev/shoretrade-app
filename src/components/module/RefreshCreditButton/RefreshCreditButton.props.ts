import { Theme } from 'types/Theme';
export interface RefreshCreditButtonProps {
  color?: keyof Theme['brand'] | keyof Theme['grey'];
  label?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}
