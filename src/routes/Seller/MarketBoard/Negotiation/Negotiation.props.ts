import { GetNegotiationByIdRequestResponseItem } from 'types/store/GetNegotiationByIdState';

export interface NegotiationProps {
  negotiation: GetNegotiationByIdRequestResponseItem | undefined;
  handleAcceptBtnClick: () => void;
  showAcceptModal: boolean;
  handleNegotiationCloseBtnClick: () => void;
  showNegotiationModal: boolean;
  handleNegotiationConfirmClick: (counterOffer: number) => void;
}
