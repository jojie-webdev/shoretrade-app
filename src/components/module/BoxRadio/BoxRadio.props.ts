export interface BoxRadioProps {
  id: string;
  checked?: boolean;
  onClick?: () => void;
  boxes: Array<{
    count: number | null;
    id: string;
    quantity: number | null;
    weight: number;
  }>;
  totalWeight: number;
  cost?: number;
  unit?: string;
}
