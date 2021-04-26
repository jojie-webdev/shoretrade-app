import { ChangeEvent } from 'react';

export type Results = {
  id: string;
  name: string;
  sortIndex: number;
  thumbnail: string;
};

export interface CategoriesLandingGeneratedProps {
  categories: Results[];
  currentPath: string;

  search: string;
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
}
