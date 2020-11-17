import { TextFieldProps } from 'components/base/TextField/TextField.props';
import { PlaceData } from 'types/PlaceData';

export interface LocationSearchProps {
  onSelect: (location?: PlaceData) => void;
  initialResult?: string[];
  autocompleteType?: string;
  textFieldProps?: TextFieldProps;
}
