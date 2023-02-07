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
}
