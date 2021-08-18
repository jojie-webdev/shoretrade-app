import { IPlayerProps } from '@lottiefiles/react-lottie-player';

export interface AnimatedSwordfishProps extends Omit<IPlayerProps, 'src'> {
  style?: Record<string, string>;
}
