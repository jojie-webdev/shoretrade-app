export interface TextAreaProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  onChangeText?: (value: string) => void;
  value?: string;
  label?: string;
  autoHeight?: boolean;
}
