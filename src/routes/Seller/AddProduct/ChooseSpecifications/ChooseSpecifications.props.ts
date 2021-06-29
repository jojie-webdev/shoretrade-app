import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

export type Option = { label: string; value: string; groupOrder: number };

export type ChooseSpecificationsPublicProps = {
  onSelectSpecifications: (
    specificationIds: string[],
    onSelectSpecifications: string[]
  ) => void;
  navBack: () => void;
};

export type ChooseSpecificationsProps = ChooseSpecificationsPublicProps & {
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
  isCustomType: boolean;
};
