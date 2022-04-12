import { ChangeEvent } from 'react';

export type Results = {
  typeId: string;
  typeName: string;
};

export interface MarketPricesGeneratedProps {
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  currentPath: string;
  resetSearchValue: () => void;
  results: Results[];
  loading: boolean;
}
