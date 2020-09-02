import { ChangeEvent } from 'react';

import { GetListingsByTypeResponseListingItem } from 'types/store/GetListingsByTypeState';

export interface CategoriesPreviewGeneratedProps {
  results: GetListingsByTypeResponseListingItem[];
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  resetSearchValue: () => void;
  loading: boolean;
  onLoad: (typeId: string) => void;
  typeId: string;
  addresses: { label: string; value: string }[];
  selectedAddress: string;
  selectAddress: (id: string) => void;
}
