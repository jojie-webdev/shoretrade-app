import { SelectProps, OptionsType } from '../Select/Select.props';

export interface MultiSelectProps extends SelectProps {
  selectedAllText?: string;
}

export interface MultiSelectListProps extends MultiSelectProps {
  updateSelected: (v: OptionsType[]) => void;
  selected: OptionsType[];
}
