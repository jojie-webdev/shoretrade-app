import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

import { Step1PublicProps } from './Step1/Step1.props';
import { Step2PublicProps } from './Step2/Step2.props';
import { Step3PublicProps } from './Step3/Step3.props';
import { Step4PublicProps } from './Step4/Step4.props';
import { Step5PublicProps } from './Step5/Step5.props';
import { Step6PublicProps } from './Step6/Step6.props';
import { Step7PublicProps } from './Step7/Step7.props';
import { Step8PublicProps } from './Step8/Step8.props';

export interface AddProductGeneratedProps
  extends Step1PublicProps,
    Step2PublicProps,
    Step3PublicProps,
    Step4PublicProps,
    Step5PublicProps,
    Step6PublicProps,
    Step7PublicProps,
    Step8PublicProps {
  currentPage: number;
  onChangeCurrentPage: (newPage: number) => void;
  typeName: string;
  isCustomType: boolean;
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
  saveListing: () => void;
  isExisting: boolean;
  discardChanges: () => void;
  userPending: boolean;
  isBulkUpload: boolean;
  discardBulkUploadChanges: () => void;
}
