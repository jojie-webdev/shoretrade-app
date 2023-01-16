import { Dispatch } from 'react';

import { EditableListingState } from 'types/store/EditableListingState';
import { CategoryData } from 'types/store/GetCustomFormDataState';

export type TypeMarginCategoryName = 'Processed' | 'Whole' | null;

export type ChooseTypePublicProps = {
  search: (term: string) => void;
  pendingSearch: boolean;
  searchResults: {
    label: string;
    value: string;
    image?: string;
    marginCategory?: TypeMarginCategoryName;
  }[];
  productsToSell: {
    label: string;
    value: string;
    image?: string;
  }[];
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
  exitFlow: () => void;
  desktopSearchValue?: string;
};

export type ChooseTypeProps = ChooseTypePublicProps & {
  editableListing: EditableListingState;
  disableBackBtn?: boolean;
};
