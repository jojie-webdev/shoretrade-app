import {
  GetActiveOffersRequestResponseItem,
  Offer,
} from 'types/store/GetActiveOffersState';

export interface OfferTagProps {
  offer: GetActiveOffersRequestResponseItem | Offer;
  marketRequestAvgPrice?: number;
  perspective: 'buyer' | 'seller';
}
