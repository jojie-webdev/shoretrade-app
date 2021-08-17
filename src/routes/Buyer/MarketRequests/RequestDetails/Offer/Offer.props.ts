import { GetActiveOffersRequestResponseItem } from 'types/store/GetActiveOffersState';
export interface OfferProps {
    sellerOffer: GetActiveOffersRequestResponseItem,
    onOfferDelete: (offerIdToDelete: string) => void
}