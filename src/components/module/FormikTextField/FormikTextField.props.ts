import { Variants } from 'components/base/Typography/Typography.props';
import { FieldInputProps } from 'formik';
import { Theme } from 'types/Theme';

export interface FormikTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  secured?: boolean;
  alert?: string;
  LeftComponent?: React.ReactNode;
  variant?: Variants;
  color?: keyof Theme['brand'] | keyof Theme['grey'];
  onChange?: (value: any) => void;
  onChangeText?: (value: string) => void;
  otherError?: string; // error triggered outside formik
}
