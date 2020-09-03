export interface SellerRatingProps {
  companyName: string;
  companyImage: string;
  companyLocation?: {
    state: string;
    countryCode: string;
  };
  rating: string | number;
  listings?: Array<any>;
  isFavorite?: boolean;
  onFavorite: () => Promise<any>;
}
