import { Dispatch, SetStateAction } from 'react';

import { CategoryItem } from '../CategorySelection/CategorySelection.props';
import { CreateStepProps } from '../Create.props';

export interface SelectSpecificationProps extends CreateStepProps {
  selectedCategory: CategoryItem;
}
