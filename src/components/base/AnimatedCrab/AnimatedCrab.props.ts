import { IPlayerProps } from '@lottiefiles/react-lottie-player';

export interface AnimatedCrabProps extends Omit<IPlayerProps, 'src'> {
  style?: Record<string, string>;
}
