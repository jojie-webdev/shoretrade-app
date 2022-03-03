import { SelectProps, OptionsType } from '../Select/Select.props';

export interface MultiSelectProps extends SelectProps {
  selectedAllText?: string;
  updateSelected: (v: OptionsType[]) => void;
  selected: OptionsType[];
}

export interface MultiSelectListProps extends MultiSelectProps {
  updateSelected: (v: OptionsType[]) => void;
  selected: OptionsType[];
}
