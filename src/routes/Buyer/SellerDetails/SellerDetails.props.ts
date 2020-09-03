import { SellerRatingProps } from 'components/module/SellerRating/SellerRating.props';

export interface SellerDetailsGeneratedProps {
  sellerRatingProps: SellerRatingProps;
  loading: boolean;
  result: Array<any>;
  search: string;
  onSearch: (x: string) => void;
}
