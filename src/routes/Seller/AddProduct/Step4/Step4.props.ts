import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

export type Step4PublicProps = {
  onUpdateImage: (
    images: Record<string, File | null>,
    existingImages: Record<string, string>
  ) => void;
  navBack: () => void;
};

export type Step4Props = Step4PublicProps & {
  isCustomType: boolean;
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
};
