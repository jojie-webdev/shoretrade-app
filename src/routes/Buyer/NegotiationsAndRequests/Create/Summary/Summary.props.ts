import { Dispatch, SetStateAction } from 'react';

import { ReactDropdownProps } from 'react-dropdown';

import { CategoryItem } from '../CategorySelection/CategorySelection.props';
import { CreateStepProps } from '../Create.props';
import { Quantity } from '../SelectQuantity/SelectQuantity.props';

export interface SummaryProps extends CreateStepProps {
  selectedCategory: CategoryItem;
  selectedSpecifications: { items: any[] };
  selectedQuantity: Quantity;
  setSendConfModalisOpen: Dispatch<SetStateAction<boolean>>;
  addressOptions: { label: string; value: string }[];
  selectedAddress: { label: string; value: string };
  onChangeAddress: (arg: any) => void;
}
