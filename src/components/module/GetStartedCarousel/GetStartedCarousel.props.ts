import { IPlayerProps } from '@lottiefiles/react-lottie-player';

export interface GetStartedCarouselProps extends Omit<IPlayerProps, 'src'> {
  image: string;
  style?: Record<string, string>;
}
