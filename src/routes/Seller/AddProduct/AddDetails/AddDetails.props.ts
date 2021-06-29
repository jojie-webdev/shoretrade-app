import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';

export type AddDetailsPublicProps = {
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

export type AddDetailsProps = AddDetailsPublicProps & {
  isCustomType: boolean;
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
};
