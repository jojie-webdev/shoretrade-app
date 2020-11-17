import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

export type Option = { label: string; value: string; groupOrder: number };

export type Step3PublicProps = {
  onSelectSpecifications: (specificationIds: string[]) => void;
};

export type Step3Props = Step3PublicProps & {
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
  isCustomType: boolean;
};
