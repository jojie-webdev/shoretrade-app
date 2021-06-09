import { SpinnerLogoProps } from 'components/base/SpinnerLogo/SpinnerLogo.props';
import { Theme } from 'types/Theme';

export interface LoadingProps {
  label?: string;
  color?: keyof Theme['grey'];
  spinnerLogoProps?: SpinnerLogoProps;
}
