import { ChangeEvent, Dispatch, SetStateAction } from 'react';

import { BoxRadioProps } from 'components/module/BoxRadio/BoxRadio.props';
import { ProductDetailsCard1Props } from 'components/module/ProductDetailsCard1/ProductDetailsCard1.props';
import { ProductDetailsCard6Props } from 'components/module/ProductDetailsCard6/ProductDetailsCard6.props';
import { ProductSellerRatingProps } from 'components/module/ProductSellerRating/ProductSellerRating.props';
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
  setFavorite: Dispatch<SetStateAction<boolean>>;
  productDetailsCard1Props: ProductDetailsCard1Props;
  productDetailsCard6Props: ProductDetailsCard6Props;
  sellerRatingProps: ProductSellerRatingProps;
  unit?: string;
  remainingWeight?: string;
  boxRadios: BoxRadioProps[];
  pressedBoxRadio: string;
  setPressedBoxRadio: Dispatch<SetStateAction<string>>;
  isAquafuture?: boolean;
  onAddToCart: () => void;
  weight: string;
  setWeight: Dispatch<string>;
  getBoxes: () => void;
}
