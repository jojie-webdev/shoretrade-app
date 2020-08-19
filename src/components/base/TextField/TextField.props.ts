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
}
