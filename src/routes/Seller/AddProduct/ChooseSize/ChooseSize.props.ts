import { Dispatch } from 'react';

import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

export type SizeInputProps = {
  metric: string;
  fromSize: string;
  setFromSize: Dispatch<string>;
  toSize: string;
  setToSize: Dispatch<string>;
  disabled?: boolean;
};

export type ChooseSizePublicProps = {
  onSelectSizes: (sizes: {
    sizeFrom?: string;
    sizeTo?: string;
    isUngraded: boolean;
    quality: string | null;
  }) => void;
  navBack: () => void;
  exitFlow: () => void;
};

export type ChooseSizeProps = ChooseSizePublicProps & {
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
  isCustomType: boolean;
  disableBackBtn?: boolean;
};
