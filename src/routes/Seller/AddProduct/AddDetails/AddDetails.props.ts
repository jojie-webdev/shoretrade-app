import { Dispatch, SetStateAction } from 'react';

import { EditableListingState } from 'types/store/EditableListingState';
import { GetListingFormDataResponse } from 'types/store/GetListingFormDataState';
import { GetNSWHolidaysPayload } from 'types/store/GetNSWHolidaysState';

export type AddDetailsPublicProps = {
  onUpdateDetails: ({
    pricePerKilo,
    auctionDate,
    catchDate,
    ends,
    origin,
    description,
    addressId,
    alwaysAvailable,
    isAquafuture,
    isAuctionSale,
    isPreAuctionSale,
    templateDeliveryDate,
    restrictToState,
    allowNegotiations,
  }: {
    isAquafuture: boolean;
    isAuctionSale: boolean;
    isPreAuctionSale: boolean;
    pricePerKilo: number;
    auctionDate: Date | null;
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
    templateDeliveryDate: string | null;
    restrictToState?: boolean;
    allowNegotiations: boolean;
  }) => void;
  marketEstimate: {
    min: number | null;
    max: number | null;
  };
  navBack: () => void;
  exitFlow: () => void;
};

export type AddDetailsProps = AddDetailsPublicProps & {
  isBulkUpload: boolean;
  isCustomType: boolean;
  isGstIncl: boolean;
  listingFormData: GetListingFormDataResponse | null;
  editableListing: EditableListingState;
  disableBackBtn?: boolean;
  nswHolidays: GetNSWHolidaysPayload | null;
};
