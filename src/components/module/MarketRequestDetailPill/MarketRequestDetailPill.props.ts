import { Weight } from 'types/store/EditableMarketRequest';

export interface MarketRequestDetailPillProps {
  onClickDelete: () => void;
  expiry: string;
  imgUrl: string;
  countAcceptedWeight: number;
  weight?: Weight;
  measurementUnit: string;
}
