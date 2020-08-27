import { Seller } from 'types/store/GetSellerByIdState';

export interface SellerRatingProps extends Seller {
  onFavorite: () => Promise<any>;
}
