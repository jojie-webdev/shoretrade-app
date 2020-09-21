import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

export type BoxType = {
  id: string;
  weight: number;
  quantity: number;
  count?: number;
};

export type Step6PublicProps = {
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
};

export type Step6Props = Step6PublicProps & {
  isCustomType: boolean;
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
};
