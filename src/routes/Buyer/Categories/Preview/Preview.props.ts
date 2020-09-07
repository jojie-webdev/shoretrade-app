import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { FilterModalProps } from 'components/module/FilterModal/FilterModal.props';
import { GetListingsByTypeResponseListingItem } from 'types/store/GetListingsByTypeState';

export interface CategoriesPreviewGeneratedProps {
  results: GetListingsByTypeResponseListingItem[];
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
  resetSearchValue: () => void;
  onLoad: (typeId: string) => void;
  typeId: string;
  addresses: { label: string; value: string }[];
  selectedAddress: string;
  selectAddress: (id: string) => void;
  // setVisible: Dispatch<SetStateAction<boolean>>;
  modalFilterProps: FilterModalProps;
}
