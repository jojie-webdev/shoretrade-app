import { Theme } from 'types/Theme';

export interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  starSize?: number;
  spacing?: number;
  unfilledColor?: keyof Theme['brand'] | keyof Theme['grey'];
  filledColor?: keyof Theme['brand'] | keyof Theme['grey'];
  style?: any;
  editable?: boolean
}
