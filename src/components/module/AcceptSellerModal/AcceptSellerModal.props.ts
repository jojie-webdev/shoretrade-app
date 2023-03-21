import { GetListingBoxesResponseItem } from 'types/store/GetListingBoxesState';
import { GetListingByIdData } from 'types/store/GetListingByIdState';
import { GetNegotiationByIdRequestResponseItem } from 'types/store/GetNegotiationByIdState';

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
  negotiation?: GetNegotiationByIdRequestResponseItem | undefined;
  pricePerUnit?: string;
}
