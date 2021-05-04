import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

export type BoxType = {
  id: string;
  weight: number;
  quantity: number;
  count?: number;
  fixed?: boolean;
};

export type Step5PublicProps = {
  onAddBoxes: ({
    isAquafuture,
    sellInMultiples,
    boxes,
    minimumOrder,
  }: {
    isAquafuture: boolean;
    sellInMultiples: boolean;
    boxes: {
      id: string;
      weight: number;
      quantity: number;
      count?: number;
    }[];
    minimumOrder: string;
  }) => void;
  navBack: () => void;
};

export type Step5Props = Step5PublicProps & {
  isCustomType: boolean;
  isExisting: boolean;
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
};
