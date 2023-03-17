import { GetListingBoxesResponseItem } from 'types/store/GetListingBoxesState';

export interface AcceptSellerModalProps {
  show: boolean;
  onAcceptBtnClick: () => void;
  onCloseClick: () => void;
  isAccepting: boolean;
  quantity: string;
  buyersNegoPrice: string;
  percentageChangeInPrice: string;
  isGoodNego: boolean;
  negoDiff: string;
  totalValue: string;
  listingBoxes: GetListingBoxesResponseItem;
  negoMeasurementUnit: string;
  acceptNegotiationError?: string;
  handleRadioClick?: (selectedGroupedBoxIndex: number) => void;
  selectedGroupedBoxIndex?: number;
}
