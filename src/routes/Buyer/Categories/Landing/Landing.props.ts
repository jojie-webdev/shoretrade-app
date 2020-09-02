import { Dispatch, ChangeEvent } from 'react';

export type Results = {
  id: string;
  name: string;
  sortIndex: number;
  thumbnail: string;
};

export interface CategoriesLandingGeneratedProps {
  categories: Results[];
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  search: string;
  currentPath: string;
  resetSearchValue: () => void;
  onLoad: () => void;
  addresses: { label: string; value: string }[];
  selectedAddress: string;
  selectAddress: (id: string) => void;
}
