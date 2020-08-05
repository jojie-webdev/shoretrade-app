export interface TextFieldProps {
  id?: string;
  type?: string;
  label?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  secured?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  LeftComponent?: React.ReactNode;
  className?: string;
}
