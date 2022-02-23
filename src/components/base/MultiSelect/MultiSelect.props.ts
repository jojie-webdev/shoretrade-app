import { IMultiselectProps } from 'multiselect-react-dropdown/dist/multiselect/interface';

export interface MultiSelectProps extends IMultiselectProps {
  disabled?: boolean;
  label?: string;
  noBorder?: boolean;
  background?: string;
}
