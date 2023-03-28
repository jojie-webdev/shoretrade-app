import { ModalProps } from 'components/layout/Modal/Modal.props';
import { GetListingBoxesResponseItem } from 'types/store/GetListingBoxesState';
import { GetListingByIdData } from 'types/store/GetListingByIdState';
import { GetNegotiationByIdRequestResponseItem } from 'types/store/GetNegotiationByIdState';

export interface NegotiationSellerModalProps extends ModalProps {
  listing: GetListingByIdData | undefined;
  negotiation: GetNegotiationByIdRequestResponseItem | undefined;
  isNegotiating?: boolean;
  onSubmit: (counterOffer: number) => void;
  listingBoxes: GetListingBoxesResponseItem;
  handleRadioClick?: (selectedGroupedBoxIndex: number) => void;
  selectedGroupedBoxIndex?: number;
  quantity: string;
  isAccepting: boolean;
  negoMeasurementUnit: string;
}
