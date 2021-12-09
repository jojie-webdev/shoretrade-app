import { Theme } from 'types/Theme';

type Variants = 'number' | 'dots' | 'infinite-dots';

export interface PaginationProps {
  numPages: number;
  currentValue: number;
  variant: Variants;
  spacing?: number;
  // For numbers variant
  onClickButton?: (nextValue: number) => void;
  color?: keyof Theme['brand'] | keyof Theme['grey'];
  iconColor?: string;
}
