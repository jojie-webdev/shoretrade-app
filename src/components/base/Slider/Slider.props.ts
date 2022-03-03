import { Dispatch } from 'react';

export interface SliderProps {
  value: number | number[];
  onChange: Dispatch<number | number[] | null | undefined>;
  min?: number;
  max?: number;
  maskValue?: (value: number) => string;
  onAfterChange?: (value: number | number[] | null | undefined) => void;
}
