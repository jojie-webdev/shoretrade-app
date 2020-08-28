export interface SellerRatingProps {
  companyName: string;
  companyImage: string;
  companyLocation?: {
    state: string;
    countryCode: string;
  };
  rating: string | number;
  listings?: Array<any>;
  isFavourite?: boolean;
  onFavourite: (x: boolean) => Promise<any>;
}
