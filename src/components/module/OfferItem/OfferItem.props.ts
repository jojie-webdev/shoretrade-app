import {
  GetActiveOffersRequestResponseItem,
  Offer,
} from 'types/store/GetActiveOffersState';
export interface OfferItemProps {
  sellerOffer: GetActiveOffersRequestResponseItem;
  onOfferDelete: (offerIdToDelete: string) => void;
  onClickItem: (offer: Offer) => void;
}
