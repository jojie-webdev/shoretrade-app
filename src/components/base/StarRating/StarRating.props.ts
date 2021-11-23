import { Theme } from 'types/Theme';

export interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  starSize?: number;
  spacing?: number;
  unfilledColor?: string;
  filledColor?: string;
  style?: any;
  editable?: boolean
}
