interface Column {
  name: string;
  selector: string;
  component: any;
}

export interface ListingCardProps {
  onClickCheckbox: (event: any) => void;
  checked: boolean;
  columns: any[];
  data: any;
  tableSettings: string[];
}
