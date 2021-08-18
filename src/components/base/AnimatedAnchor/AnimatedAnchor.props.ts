import { IPlayerProps } from '@lottiefiles/react-lottie-player';

export interface AnimatedAnchorProps extends Omit<IPlayerProps, 'src'> {
  style?: Record<string, string>;
}
