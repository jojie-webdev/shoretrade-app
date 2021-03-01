import { Dispatch, SetStateAction } from 'react';

import { CategoryItem } from '../CategorySelection/CategorySelection.props';
import { CreateStepProps } from '../Create.props';
import { Quantity } from '../SelectQuantity/SelectQuantity.props';

export interface SummaryProps extends CreateStepProps {
  selectedCategory: CategoryItem;
  selectedSpecifications: any[];
  selectedQuantity: Quantity;
  selectedSize: any[];
}
