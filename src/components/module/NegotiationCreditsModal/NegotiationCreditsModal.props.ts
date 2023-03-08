import { GetNegotiationCreditRequestResponseItem } from 'types/store/GetNegotiationCreditState';

export interface NegotiationCreditsModalProps {
  showNegoCreditsModal: boolean;
  handleShowNegoCreditsModal: () => void;
  negotiationCredit: GetNegotiationCreditRequestResponseItem | undefined;
}
