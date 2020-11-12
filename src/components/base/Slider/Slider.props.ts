import { Dispatch } from 'react';

export interface SliderProps {
  value: number | number[];
  onChange: Dispatch<number | number[] | null | undefined>;
  max?: number;
  maskValue?: (value: number) => string;
  onAfterChange?: (value: number | number[] | null | undefined) => void;
}
