import { SwiperOptions } from 'swiper';

export interface MultipleCarouselProps<D, CP> {
  id?: string;
  transform: (data: D) => CP;
  data: D[];
  Component: React.FC<CP>;
  link: (id?: string) => string;
  onSlideChange?: (ndx: number) => void;
  breakpoints?: {
    [ratio: string]: SwiperOptions;
    [width: number]: SwiperOptions;
  };
  emptyText?: string;
  responsive?: boolean;
}
