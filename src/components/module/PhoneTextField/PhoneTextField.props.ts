import { Dispatch, SetStateAction } from 'react';

import { TextFieldProps } from 'components/base/TextField/TextField.props';

export interface PhoneTextFieldProps extends TextFieldProps {
  label: string;
  name: string;
  callingCode: string;
  setCallingCode: (callingCode: string) => void;
  toggleCountryCode?: boolean;
  setToggleCountryCode?: Dispatch<SetStateAction<boolean>>;
  onChangeMobile?: (mobile: string, prefix: string) => void;
}
