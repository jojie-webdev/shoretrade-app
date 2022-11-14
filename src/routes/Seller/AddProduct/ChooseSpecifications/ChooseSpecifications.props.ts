import { EditableListingState } from 'types/store/EditableListingState';
import { CategoryData } from 'types/store/GetCustomFormDataState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

export type Option = { label: string; value: string; groupOrder: number };

export type ChooseSpecificationsPublicProps = {
  onSelectSpecifications: (
    specificationIds: string[],
    onSelectSpecifications: string[]
  ) => void;
  navBack: () => void;
  updateAdditionalInfos: (params: {
    isIkeJime?: boolean;
    isIceSlurry?: boolean;
  }) => void;
  additionalInfos: {
    isIkeJime: boolean;
    isIceSlurry: boolean;
  };
};

export type ChooseSpecificationsProps = ChooseSpecificationsPublicProps & {
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
  isCustomType: boolean;
  categories: CategoryData[];
  disableBackBtn?: boolean;
};
