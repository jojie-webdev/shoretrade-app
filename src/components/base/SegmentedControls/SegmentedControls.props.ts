export interface SegmentedControlsProps {
  options: string[];
  selectedOption: string | number;
  onClickControl: (newValue: string) => void;
  tooltips?: { option: string; value: string }[];
  controlButtonColor?: string;
  controlButtonTextColor?: string;
}
