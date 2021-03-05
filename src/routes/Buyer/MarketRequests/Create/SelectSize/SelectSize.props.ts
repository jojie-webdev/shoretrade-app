import { Dispatch, SetStateAction } from 'react';

import { CategoryItem } from '../CategorySelection/CategorySelection.props';
import { CreateStepProps } from '../Create.props';

export interface SizeOptions {
  to: string;
  from: string;
  items: string[];
  ungraded?: boolean;
}
export interface SelectSizeProps extends CreateStepProps {
  setSelectedSize: Dispatch<SetStateAction<SizeOptions>>;
  selectedCategory: CategoryItem;
}

export type SizeInputProps = {
  metric: string;
  fromSize: string;
  setFromSize: Dispatch<string>;
  toSize: string;
  setToSize: Dispatch<string>;
  disabled: boolean;
  sizeItemChecked: { items: string[] };
  setSizeItemChecked: Dispatch<{ items: string[] }>;
};
