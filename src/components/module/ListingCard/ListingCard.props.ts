interface Column {
  name: string;
  selector: string;
  component: any;
}

export interface ListingCardProps {
  columns: any[];
  data: any;
  tableSettings: string[];
  isSelected: boolean;
  onSelect: (isSelected: boolean) => void;
  last: boolean;
}
