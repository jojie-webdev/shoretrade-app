import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

export type Step7PublicProps = {
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
};

export type Step7Props = Step7PublicProps & {
  isCustomType: boolean;
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
};
