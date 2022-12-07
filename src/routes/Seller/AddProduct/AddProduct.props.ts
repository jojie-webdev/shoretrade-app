import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';
import { GetNSWHolidaysPayload } from 'types/store/GetNSWHolidaysState';

import { AddBoxesPublicProps } from './AddBoxes/AddBoxes.props';
import { AddDetailsPublicProps } from './AddDetails/AddDetails.props';
import { AddPackagingPublicProps } from './AddPackaging/AddPackaging.props';
import { AddPhotosPublicProps } from './AddPhotos/AddPhotos.props';
import { ChooseAccountPublicProps } from './ChooseAccount/ChooseAccount.props';
import { ChooseSizePublicProps } from './ChooseSize/ChooseSize.props';
import { ChooseSpecificationsPublicProps } from './ChooseSpecifications/ChooseSpecifications.props';
import { ChooseTypePublicProps } from './ChooseType/ChooseType.props';
import { HistoricalListingsPublicProps } from './HistoricalListings/HistoricalListings.props';
import { ReviewPublicProps } from './Review/Review.props';

export interface AddProductGeneratedProps
  extends ChooseAccountPublicProps,
    HistoricalListingsPublicProps,
    ChooseTypePublicProps,
    ChooseSpecificationsPublicProps,
    ChooseSizePublicProps,
    AddPhotosPublicProps,
    AddPackagingPublicProps,
    AddBoxesPublicProps,
    AddDetailsPublicProps,
    ReviewPublicProps {
  currentPage: number;
  onChangeCurrentPage: (newPage: number) => void;
  exitFlow: () => void;
  typeName: string;
  isCustomType: boolean;
  isGstIncl: boolean;
  listingFormData: GetListingFormDataResponse | null;
  nswHolidays: GetNSWHolidaysPayload | null;
  editableListing: EditableListingState;
  saveListing: () => void;
  isExisting: boolean;
  discardChanges: () => void;
  userPending: boolean;
  isBulkUpload: boolean;
  discardBulkUploadChanges: () => void;
  isFromBulkUploadPreview: boolean;
}
