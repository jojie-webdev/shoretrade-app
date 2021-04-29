import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { FilterModalProps } from 'components/module/FilterModal/FilterModal.props';
import { FilterDataResponse } from 'types/store/GetBuyerSearchFilterDataState';
import { GetListingsByTypeResponseListingItem } from 'types/store/GetListingsByTypeState';

export interface CategoriesPreviewGeneratedProps {
  results: GetListingsByTypeResponseListingItem[];
  isLoadingResults: boolean;
  onChangeSearchValue: (event: ChangeEvent<HTMLInputElement>) => void;
  searchValue: string;
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
