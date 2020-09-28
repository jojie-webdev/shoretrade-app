export interface CarouselProps {
  images: string[];
  id: string;
  height?: string; // height in px
  swiperWidth?: string; // percentage of swiper area
  loop?: boolean;
  autoplay?: boolean;
}
