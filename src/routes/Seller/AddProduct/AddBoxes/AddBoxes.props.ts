import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

export type BoxType = {
  id: string;
  weight: number;
  quantity: number;
  count?: number;
  fixed?: boolean;
};

export type AddBoxesPublicProps = {
  onAddBoxes: ({
    sellInMultiples,
    boxes,
    minimumOrder,
    isAquafuture,
  }: {
    sellInMultiples: boolean;
    boxes: {
      id: string;
      weight: number;
      quantity: number;
      count?: number;
    }[];
    minimumOrder: string;
    isAquafuture: boolean;
  }) => void;
  navBack: () => void;
};

export type AddBoxesProps = AddBoxesPublicProps & {
  isBulkUpload: boolean;
  isCustomType: boolean;
  isExisting: boolean;
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
};
