import { Dispatch, SetStateAction } from 'react';

import { CategoryItem } from '../CategorySelection/CategorySelection.props';
import { CreateStepProps } from '../Create.props';

export interface Quantity {
  from: number;
  to: number;
}

export interface SelectQuantityProps extends CreateStepProps {
  setSelectedQuantity: Dispatch<SetStateAction<Quantity>>;
  selectedCategory: CategoryItem;
}
