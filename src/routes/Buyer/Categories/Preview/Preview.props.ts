import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { FilterModalProps } from 'components/module/FilterModal/FilterModal.props';
import { FilterDataResponse } from 'types/store/GetBuyerSearchFilterDataState';
import { GetListingsByTypeResponseListingItem } from 'types/store/GetListingsByTypeState';

export interface CategoriesPreviewGeneratedProps {
  results: GetListingsByTypeResponseListingItem[];
  isLoadingResults: boolean;
  searchValue: string;
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  onResetSearchValue: () => void;
  onLoad: (typeId: string) => void;
  typeId: string;
  selectAddress: (id: string) => void;
  modalFilterProps: FilterModalProps;
  isPendingAccount: boolean;

  //filterData?: FilterDataResponse;
  // onChangeFilter: (f: {
  //   catchmentArea?: string;
  //   sizeRangeFrom?: number | string;
  //   sizeRangeTo?: number | string;
  //   specifications?: string;
  //   showUngraded?: boolean;
  // }) => void;
}

export type FilterData = {
  catchmentArea?: any;
  sizeRangeFrom: number | string | null;
  sizeRangeTo: number | string | null;
  specifications?: any;
  showUngraded?: boolean;
};
