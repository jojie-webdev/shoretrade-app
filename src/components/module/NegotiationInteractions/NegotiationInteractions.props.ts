import { GetAllNegoRequestResponseItem } from 'types/store/GetAllNegotiationsState';

export interface NegotiationInteractionsProps {
  onClick: () => void;
  data: GetAllNegoRequestResponseItem;
  isMobile: boolean;
}
