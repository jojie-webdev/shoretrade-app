import styled from 'utils/styled';
// D = Data, CP = Component Props
export interface MultipleCarouselProps<T, CP> {
  transform: (data: T) => CP;
  data: T[];
  Component: React.FC<CP>;
  link: (id?: string) => string;
}
