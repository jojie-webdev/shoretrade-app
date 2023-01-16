import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

import { TypeMarginCategoryName } from '../ChooseType/ChooseType.props';

export type ReviewPublicProps = {
  preview: () => void;
  boxesDetails: Box[];
  measurementUnit: string;
  pendingSave: boolean;
  isBulkUpload: boolean;
  typeMarginCategory?: TypeMarginCategoryName;
};

export interface BoxItemProps {
  weight: number;
  quantity: number;
  count?: number;
  unit: string;
}

export interface Box {
  id: string;
  weight: number;
  quantity: number;
  count?: number;
  sold?: number;
  stocks?: number;
}

export type ReviewProps = ReviewPublicProps & {
  isCustomType: boolean;
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
  saveListing: () => void;
  onChangeCurrentPage: (page: number) => void;
  preview: () => void;
  navBack: () => void;
  exitFlow: () => void;
};
