export interface CarouselV2Props {
  images: string[];
  id: string;
  height?: string; // height in px
  swiperWidth?: string; // percentage of swiper area
  arrowWidth?: number;
  justifyArrows?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  hideArrowArea?: boolean;
  aspectRatio?: AspectRatio;
  addMargin?: boolean;
  arrowInside?: boolean;
  showAquafuture?: boolean;
  showAlmostGone?: boolean;
}

export type AspectRatio = '16:9' | '9:4';

export type MediaQueries = {
  '1440': number;
  '1366': number;
  '1024': number;
  '768': number;
  '375': number;
};
