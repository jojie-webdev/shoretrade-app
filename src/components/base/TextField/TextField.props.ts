
import { Variants } from 'components/base/Typography/Typography.props';
import { Theme } from 'types/Theme';

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onChangeText?: (value: string) => void;
  secured?: boolean;
  error?: string;
  LeftComponent?: React.ReactNode;
  className?: string;
  alert?: string;
  prefix?: string;
  variant?: Variants;
  color?: keyof Theme['brand'] | keyof Theme['grey'];
}
