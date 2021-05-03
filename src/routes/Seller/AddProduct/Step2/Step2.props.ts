import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

export type Option = { label: string; value: string; groupOrder: number };

export type Step2PublicProps = {
  onSelectSpecifications: (
    specificationIds: string[],
    onSelectSpecifications: string[]
  ) => void;
};

export type Step2Props = Step2PublicProps & {
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
  isCustomType: boolean;
};
