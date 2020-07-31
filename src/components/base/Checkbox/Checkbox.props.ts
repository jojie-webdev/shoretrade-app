import { TypographyProps } from 'components/base/Typography/Typography.props';

export interface CheckboxProps extends React.HTMLProps<HTMLInputElement> {
  label?: string;
  typographyProps?: Partial<TypographyProps>;
  size?: number;
  scale?: number;
}
