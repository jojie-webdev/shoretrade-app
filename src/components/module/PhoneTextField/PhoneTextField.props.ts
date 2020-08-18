import { Dispatch, SetStateAction } from 'react';

import { TextFieldProps } from 'components/base/TextField/TextField.props';

export interface PhoneTextFieldProps extends TextFieldProps {
  callingCode?: string;
  setCallingCode?: Dispatch<SetStateAction<string>>;
}
