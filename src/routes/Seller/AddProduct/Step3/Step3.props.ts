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

export type Step3PublicProps = {
  onSelectSizes: (sizes: {
    sizeFrom?: string;
    sizeTo?: string;
    isUngraded: boolean;
  }) => void;
};

export type Step3Props = Step3PublicProps & {
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
  isCustomType: boolean;
};
