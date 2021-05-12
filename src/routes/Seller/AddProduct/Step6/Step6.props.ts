import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

export type Step6PublicProps = {
  onUpdateDetails: ({
    pricePerKilo,
    catchDate,
    ends,
    origin,
    description,
    addressId,
  }: {
    pricePerKilo: number;
    catchDate: Date;
    ends: Date;
    origin: {
      suburb: string;
      state: string;
      countryCode: string;
    };
    description: string;
    addressId: string;
  }) => void;
  marketEstimate: {
    min: number | null;
    max: number | null;
  };
  navBack: () => void;
};

export type Step6Props = Step6PublicProps & {
  isCustomType: boolean;
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
};
