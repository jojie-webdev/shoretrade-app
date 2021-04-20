import { TextFieldProps } from 'components/base/TextField/TextField.props';

export interface PhoneTextFieldProps extends TextFieldProps {
  label: string;
  name: string;
  callingCode: string;
  setCallingCode: (callingCode: string) => void;
  onChangeMobile?: (mobile: string, prefix: string) => void;
}
