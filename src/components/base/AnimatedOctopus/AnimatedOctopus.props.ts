import { IPlayerProps } from '@lottiefiles/react-lottie-player';

export interface AnimatedOctopusProps extends Omit<IPlayerProps, 'src'> {
  style?: Record<string, string>;
}
