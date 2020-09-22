export interface BoxRadioProps {
  id: string;
  checked?: boolean;
  onClick?: () => void;
  weight: number;
  quantity: number;
  totalWeight?: number;
  cost?: number;
  unit?: string;
}
