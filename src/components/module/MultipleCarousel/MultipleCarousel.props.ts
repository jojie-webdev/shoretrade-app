import styled from 'utils/styled';
// D = Data, CP = Component Props
export interface MultipleCarouselProps<D, CP> {
  transform: (data: D) => CP;
  data: D[];
  Component: React.FC<CP>;
  link: (id?: string) => string;
  slidesPerView?: number;
}
