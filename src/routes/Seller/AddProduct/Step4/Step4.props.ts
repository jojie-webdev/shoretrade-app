import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

export type Step5PublicProps = {
  onUpdateImage: (
    images: Record<string, File | null>,
    existingImages: Record<string, string>
  ) => void;
};

export type Step5Props = Step5PublicProps & {
  isCustomType: boolean;
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
};
