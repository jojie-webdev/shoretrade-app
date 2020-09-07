import { ChangeEvent } from 'react';

import { ProductDetailsCard1Props } from 'components/module/ProductDetailsCard1/ProductDetailsCard1.props';
import { GetListingResponseItem } from 'types/store/GetListingState';
export interface ProductDetailsGeneratedProps {
  currentListing: GetListingResponseItem;
  onLoad: (listingId: string) => void;
  listingId: string;
  addresses: { label: string; value: string }[];
  selectedAddress: string;
  selectAddress: (id: string) => void;
  favorite: boolean;
  onFavorite: () => void;
  productDetailsCard1Props: ProductDetailsCard1Props;
}
