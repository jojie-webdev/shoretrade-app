import {
  GetActiveOffersRequestResponseItem,
  Offer,
} from 'types/store/GetActiveOffersState';

export interface OfferTagProps {
  status: string;
  price?: number;
  offers?: number;
  marketStatus?: string;
  marketRequestAvgPrice?: number;
  perspective: 'buyer' | 'seller';
  isMarketRequest?: boolean;
}
