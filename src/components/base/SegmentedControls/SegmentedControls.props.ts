export interface SegmentedControlsProps {
  options: string[];
  selectedOption: string | number;
  onClickControl: (newValue: string) => void;
}
