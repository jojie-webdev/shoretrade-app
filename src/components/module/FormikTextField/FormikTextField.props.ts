import { FieldInputProps } from 'formik';

export interface FormikTextFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  secured?: boolean;
  alert?: string;
}
