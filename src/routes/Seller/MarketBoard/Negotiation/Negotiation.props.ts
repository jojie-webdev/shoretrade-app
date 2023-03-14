import { Variants } from 'components/module/SellerNegotiationAlert/SellerNegotiationAlert.props';
import { GetListingByIdData } from 'types/store/GetListingByIdState';
import { GetNegotiationByIdRequestResponseItem } from 'types/store/GetNegotiationByIdState';

export interface NegotiationProps {
  negotiation: GetNegotiationByIdRequestResponseItem | undefined;
  handleAcceptBtnClick: () => void;
  showAcceptModal: boolean;
  handleNegotiationCloseBtnClick: () => void;
  showNegotiationModal: boolean;
  handleNegotiationConfirmClick: (counterOffer: number) => void;
  handleAcceptModalAcceptBtnClick: () => void;
  handleDeclineClick: () => void;
  showDeclineModal: boolean;
  handleDeclineModalCancelBtnClick: () => void;
  handleDeclineModalConfirmBtnClick: () => void;
  isAcceptNegotiationPending: boolean;
  isDeclineNegotiationPending: boolean;
  showDeclinedNegoModal: boolean;
  handleDeclinedNegoModalClose: () => void;
  showSuccessfulNegoModal: boolean;
  handleSuccessfulNegoModalClose: () => void;
  showNegotiationAcceptedModal: boolean;
  handleNegotiationAcceptedModalClose: () => void;
  listing: GetListingByIdData | undefined;
}

export interface AlertProps {
  title: string;
  alertColor: Variants;
  description: JSX.Element;
}
