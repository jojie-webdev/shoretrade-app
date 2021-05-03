import { Dispatch } from 'react';

import { EditableListingState } from 'types/store/EditableListingState';
import { CategoryData } from 'types/store/GetCustomFormDataState';
import { SearchProductTypeResponseItem } from 'types/store/SearchProductTypeState';

export type Step1PublicProps = {
  search: (term: string) => void;
  pendingSearch: boolean;
  searchResults: SearchProductTypeResponseItem[];
  selectProductType: (typeId: string) => void;
  showCustomTypeSettings: boolean;
  setShowCustomTypeSettings: Dispatch<boolean>;
  getCustomFormData: () => void;
  categories: CategoryData[];
  selectCustomType: ({
    customTypeName,
    selectedCategory,
    selectedMetric,
  }: {
    customTypeName: string;
    selectedCategory: string;
    selectedMetric: {
      id: string;
      name: string;
    };
  }) => void;
  navBack: () => void;
  desktopSearchValue?: string;
};

export type Step1Props = Step1PublicProps & {
  editableListing: EditableListingState;
};
