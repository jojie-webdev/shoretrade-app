export interface SwiperContainerProps {
  height?: string; // height in px
  children: React.ReactNode;
  aspectRatio?: AspectRatio;
  addMargin?: boolean;
}

export type AspectRatio = '16:9' | '9:4';

export type MediaQueries = {
  '1440': number;
  '1366': number;
  '1024': number;
  '768': number;
  '375': number;
};
