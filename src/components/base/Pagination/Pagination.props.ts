export interface PaginationProps {
  numPages: number;
  currentValue: number;
  // For numbers variant
  onClickButton: (nextValue: number) => void;
}
