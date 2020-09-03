import { ChangeEvent } from 'react';

import { GetListingResponseItem } from 'types/store/GetListingState';

export interface ProductDetailsGeneratedProps {
  currentListing: GetListingResponseItem;
  onLoad: (listingId: string) => void;
  listingId: string;
  addresses: { label: string; value: string }[];
  selectedAddress: string;
  selectAddress: (id: string) => void;
}
