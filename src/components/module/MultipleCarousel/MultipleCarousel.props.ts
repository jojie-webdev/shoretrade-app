import { SwiperOptions } from 'swiper';
import { Swiper } from 'swiper/react';
import styled from 'utils/styled';
// D = Data, CP = Component Props
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
