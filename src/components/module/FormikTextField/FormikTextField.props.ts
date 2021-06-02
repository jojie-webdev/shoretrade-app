import { TextFieldProps } from 'components/base/TextField/TextField.props';

export interface FormikTextFieldProps extends TextFieldProps {
  name: string;
  onChange?: (value: any) => void;
  onChangeText?: (value: string) => void;
  otherError?: string; // error triggered outside formik
}
