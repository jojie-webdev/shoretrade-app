import { OfferStatus } from 'types/store/GetActiveOffersState';

export interface OfferAlertProps {
  status: OfferStatus;
  thereIsNewOffer?: boolean;
  counterOffer?: string;
  orderRefNumber?: string | number;
}
