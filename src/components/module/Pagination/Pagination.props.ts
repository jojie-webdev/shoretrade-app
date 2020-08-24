type Variants = 'number' | 'dots' | 'infinite-dots';

export interface PaginationProps {
  numPages: number;
  currentValue: number;
  // For numbers variant
  onClickButton: (nextValue: number) => void;
  variant: Variants;
  spacing?: number;
}
