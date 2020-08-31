import { SellerRatingProps } from 'components/module/SellerRating/SellerRating.props';

export interface SellerDetailsGeneratedProps extends SellerRatingProps {
  loading: boolean;
  categories: Array<any>;
  search: string;
  onSearch: (x: string) => void;
}
