import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

export interface CustomSize {
  width: string;
  height: string;
  length: string;
}

export type AddPackagingPublicProps = {
  onAddPackaging: ({
    isAquafuture,
  }: {
    isAquafuture: boolean;
    id?: string;
    custom?: {
      width: number;
      height: number;
      length: number;
      airlineApproved?: boolean;
    };
  }) => void;
  navBack: () => void;
};

export type AddPackagingProps = AddPackagingPublicProps & {
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
  disableBackBtn?: boolean;
};
