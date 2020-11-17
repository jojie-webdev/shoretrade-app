import { Theme } from 'types/Theme';
export interface LoadingProps {
  label?: string;
  color?: keyof Theme['grey'];
}
