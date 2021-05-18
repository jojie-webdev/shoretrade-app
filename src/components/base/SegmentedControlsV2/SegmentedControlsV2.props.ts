import { ReactNode } from 'react';

export interface SegmentedControlsV2Props {
  options: string[];
  selectedOption: string | number;
  onClickControl: (newValue: string) => void;
  tooltips?: { option: string; value: string }[];
  children?: ReactNode;
}
