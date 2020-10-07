export interface CarouselProps {
  images: string[];
  id: string;
  height?: string; // height in px
  swiperWidth?: string; // percentage of swiper area
  arrowWidth?: number;
  justifyArrows?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  hideArrowArea?: boolean;
}
