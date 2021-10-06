import { Weight } from 'types/store/EditableMarketRequest';

export interface MarketRequestSummaryProps {
  specs?: string[];
  sizeFrom?: string;
  sizeTo?: string;
  sizeUngraded: boolean;
  sizeOptions: string[];
  metric: string;
  weight?: Weight;
  measurementUnit: string;
}
