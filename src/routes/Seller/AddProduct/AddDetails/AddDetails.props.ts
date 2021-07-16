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
    alwaysAvailable,
  }: {
    pricePerKilo: number;
    catchDate: Date | null;
    catchRecurrence: string | null;
    ends: Date | null;
    origin: {
      suburb: string;
      state: string;
      countryCode: string;
    };
    description: string;
    addressId: string;
    alwaysAvailable: boolean;
  }) => void;
  marketEstimate: {
    min: number | null;
    max: number | null;
  };
  navBack: () => void;
};

export type AddDetailsProps = AddDetailsPublicProps & {
  isBulkUpload: boolean;
  isCustomType: boolean;
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
};
