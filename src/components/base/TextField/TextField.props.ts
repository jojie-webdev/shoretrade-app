export interface TextFieldProps {
  label?: string;
  value?: string;
  onChangeText?: (value: string) => void;
  placeholder?: string;
  secured?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
