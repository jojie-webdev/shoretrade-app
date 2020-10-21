import { FilterDataResponse } from 'types/store/GetBuyerSearchFilterDataState';

export interface FilterAreaProps {
  filterData?: FilterDataResponse;
  onChangeFilter: (f: {
    catchmentArea?: string;
    sizeRangeFrom?: number | string;
    sizeRangeTo?: number | string;
    specifications?: string;
    showUngraded?: boolean;
  }) => void;
}
