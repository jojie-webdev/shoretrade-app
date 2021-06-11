import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

export type Step7PublicProps = {
  preview: () => void;
  boxesDetails: Box[];
  measurementUnit: string;
  pendingSave: boolean;
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
}

export type Step7Props = Step7PublicProps & {
  isCustomType: boolean;
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
  saveListing: () => void;
  onChangeCurrentPage: (page: number) => void;
  preview: () => void;
  navBack: () => void;
};
