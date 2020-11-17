export interface ProductDetailsCard1Props {
  cBorderWidth?: string;
  cBorderRadius?: string;
  title: string;
  tags?: { label: string }[];
  size?: string;
  location?: string;
  isFavorite?: boolean;
  onFavorite?: () => void;
}
