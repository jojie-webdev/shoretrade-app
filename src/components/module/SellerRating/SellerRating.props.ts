export interface SellerRatingProps {
  name: string;
  isSmallName?: boolean;
  uri?: string;
  location?: string;
  rating: string;
  isFavorite?: boolean;
  onFavorite: () => Promise<void>;
}
