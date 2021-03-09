import { Dispatch, SetStateAction } from 'react';

import { CategoryItem } from '../CategorySelection/CategorySelection.props';
import { CreateStepProps } from '../Create.props';
import { Quantity } from '../SelectQuantity/SelectQuantity.props';
import { SizeOptions } from '../SelectSize/SelectSize.props';

export interface SummaryProps extends CreateStepProps {
  selectedCategory: CategoryItem;
  selectedSpecifications: { items: any[] };
  selectedQuantity: Quantity;
  setSendConfModalisOpen: Dispatch<SetStateAction<boolean>>;
  maxKgAutoClose: boolean;
  setMaxKgAutoClose: Dispatch<SetStateAction<boolean>>;
}
