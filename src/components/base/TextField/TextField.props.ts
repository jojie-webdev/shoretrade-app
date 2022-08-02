import { Variants } from 'components/base/Typography/Typography.props';
import { Theme } from 'types/Theme';

export interface TextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onChangeText?: (value: string) => void;
  secured?: boolean;
  error?: string;
  LeftComponent?: React.ReactNode;
  RightComponent?: React.ReactNode;
  rightComponentDirection?: string;
  className?: string;
  alert?: string;
  prefix?: string;
  suffix?: string;
  variant?: Variants;
  color?: keyof Theme['brand'] | keyof Theme['grey'];
  inputType?:
    | 'text'
    | 'none'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search';
  borderRadius?: string;
  maxLength?: number;
  tooltipText?: string;
}
