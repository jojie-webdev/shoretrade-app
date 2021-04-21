export interface ProductSellerRatingProps {
  name: string;
  uri?: string;
  location?: string;
  rating: string;
  isFavorite?: boolean;
  onFavorite: () => Promise<void>;
  onClickSeller: () => void;
  withBackground: boolean;
  showFavoriteButton: boolean;
}
