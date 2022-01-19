import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

export type AddPhotosPublicProps = {
  onUpdateImage: (
    images: Record<string, File | null>,
    existingImages: Record<string, string>
  ) => void;
  navBack: () => void;
  onSetProductPhotoType: (id: number) => void;
  photoTypeData: any[];
};

export type AddPhotosProps = AddPhotosPublicProps & {
  isCustomType: boolean;
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
};
