import { Dispatch, SetStateAction } from 'react';

import { CreateStepProps } from '../Create.props';

export interface CategoryItem {
  id: string;
  name: string;
}

export interface CategorySelectionProps extends CreateStepProps {
  searchTerm: string;
  categories: CategoryItem[];
  setSearchTerm: Dispatch<SetStateAction<string>>;
  setSelectedCategory: Dispatch<SetStateAction<CategoryItem>>;
}
