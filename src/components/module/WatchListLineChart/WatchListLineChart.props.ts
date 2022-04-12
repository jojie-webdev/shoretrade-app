import { LinePathData } from 'types/LinePathData';
import { Theme } from 'types/Theme';

export interface WatchListLineChartProps {
  chartTitle: WatchListChartTitle;
  data: LinePathData;
  yAxisLabelFormat: (value: number) => string;
  onRangeChange: (value: string) => void;
  cHeight: number;
  stroke?: keyof Theme['brand'];
  strokeWidth?: number;
  isEarning?: boolean;
  dotSize?: number;
}

export type WatchListChartTitle = {
  value: string;
  prefix: string;
  postfix: string;
  postfixColor: keyof Theme['brand'] | keyof Theme['grey'];
};
