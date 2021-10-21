import {
  GetActiveOffersRequestResponseItem,
  Offer,
} from 'types/store/GetActiveOffersState';

export interface OfferTagProps {
  status: string;
  price?: number;
  marketRequestAvgPrice?: number;
  perspective: 'buyer' | 'seller';
}
