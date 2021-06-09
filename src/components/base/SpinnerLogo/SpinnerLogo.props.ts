import { IPlayerProps } from '@lottiefiles/react-lottie-player';

export interface SpinnerLogoProps extends Omit<IPlayerProps, 'src'> {
  variant?: 'light' | 'dark';
  style?: Record<string, string>;
}
