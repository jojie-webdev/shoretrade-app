import { FilterModalProps } from 'components/module/FilterModal/FilterModal.props';

export interface MarketFilters {
  metric: string;
  region: {
    region: string;
    country: string;
  }[];
  sizeFrom: number | string[];
  sizeTo: number | string[];
  stateOne: { id: string; value: string }[];
  stateTwo: { id: string; value: string }[];
  stateThree: { id: string; value: string }[];
}

export type GraphData = {
  dates: string[];
  values: number[];
};

export interface MarketPriceDetailGeneratedProps extends FilterModalProps {
  openFilterModal: () => void;
  name: string;
  data: any;
  graphData: GraphData;
}
