import { LinePathData } from 'types/LinePathData';
import { Theme } from 'types/Theme';

export interface LinePathProps {
  data: LinePathData;
  cWidth?: number;
  cHeight?: number;
  width: number;
  height: number;
  stroke?: keyof Theme['brand'];
  strokeWidth?: number;
}
