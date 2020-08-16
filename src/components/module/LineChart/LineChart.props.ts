import { LinePathData } from 'types/LinePathData';
import { Theme } from 'types/Theme';

export interface LineChartProps {
  title: string;
  data: LinePathData;
  yAxisLabelFormat: (value: number) => string;
  cHeight: number;
  stroke?: keyof Theme['brand'];
  strokeWidth?: number;
}
