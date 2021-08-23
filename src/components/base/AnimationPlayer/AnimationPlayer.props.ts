import { IPlayerProps } from '@lottiefiles/react-lottie-player';

export interface AnimationPlayerProps extends Omit<IPlayerProps, 'src'> {
  src: string;
  style?: Record<string, string>;
}
