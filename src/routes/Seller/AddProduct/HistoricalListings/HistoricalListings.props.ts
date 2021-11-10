import { HistoricalListingItem } from 'types/store/GetHistoricalListingsState';

export type HistoricalListingsPublicProps = {
  searchHistoricalListings: (term: string) => void;
  historicalListings: HistoricalListingItem[];
  navBack: () => void;
  onSkipHistoricalListings: () => void;
  onUseHistoricalListing: (listingId: string, typeId: string) => void;
};

export type HistoricalListingsProps = HistoricalListingsPublicProps;
