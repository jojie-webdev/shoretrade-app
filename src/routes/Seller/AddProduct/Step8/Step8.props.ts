import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

export type Step8Props = {
  isCustomType: boolean;
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
  saveListing: () => void;
  onChangeCurrentPage: (page: number) => void;
};
