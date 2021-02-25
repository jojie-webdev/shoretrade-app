import { Dispatch, SetStateAction } from 'react';

import { CategoryItem } from '../CategorySelection/CategorySelection.props';
import { CreateStepProps } from '../Create.props';

export interface SelectSizeProps extends CreateStepProps {
  setSelectedSize: Dispatch<SetStateAction<any[]>>;
  selectedCategory: CategoryItem;
}
