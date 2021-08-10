export interface ProductSellerProps {
  name: string;
  uri?: string;
  location?: string;
  rating: string;
  isFavorite?: boolean;
  onFavorite?: () => Promise<void>;
  onClickSeller?: () => void;
  withBackground: boolean;
  fullWidth?: boolean;
  showFavoriteButton: boolean;
  bottomComponent?: React.ReactNode;
}
