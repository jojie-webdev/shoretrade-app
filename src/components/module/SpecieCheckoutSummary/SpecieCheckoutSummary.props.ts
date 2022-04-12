import { SpecieSelectionItem } from 'routes/Seller/MarketPrices/Species/Species.props';
import { GetSpecieResponseItem } from 'types/store/GetSpeciesState';

export interface SpecieCheckoutSummaryProps {
  items: SpecieSelectionItem[];
  onItemRemoved?: () => void;
  onClickCheckout?: () => void;
}
