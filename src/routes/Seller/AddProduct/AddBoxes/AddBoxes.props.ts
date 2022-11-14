import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

export type BoxType = {
  id: string;
  weight: number;
  quantity: number;
  count?: number;
  fixed?: boolean;
  sold?: number;
  stocks?: number;
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
      sold?: number;
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
  disableBackBtn?: boolean;
};
