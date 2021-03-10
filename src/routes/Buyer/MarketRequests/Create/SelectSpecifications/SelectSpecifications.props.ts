import { Dispatch, SetStateAction } from 'react';

import { CategoryItem } from '../CategorySelection/CategorySelection.props';
import { CreateStepProps } from '../Create.props';

export interface SelectSpecificationProps extends CreateStepProps {
  selectedSpecifications: { items: any[] };
  setSelectedSpecifications: Dispatch<SetStateAction<{ items: any[] }>>;
  selectedCategory: CategoryItem;
}
