import { ChangeEvent } from 'react';

export interface MarketPricesGeneratedProps {
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  currentPath: string;
  resetSearchValue: () => void;
}
