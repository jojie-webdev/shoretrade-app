import { ProductDetailsCard6Props } from 'components/module/ProductDetailsCard6/ProductDetailsCard6.props';
import { GetBuyerHomepageResponseListingItem } from 'types/store/GetBuyerHomepageState';
import { GetCompanyPlanResponseData } from 'types/store/GetCompanyPlanState';
import { GetNegotiationCreditRequestResponseItem } from 'types/store/GetNegotiationCreditState';

import { Box } from '../ProductDetails/ProductDetails.props';

export type CategoryResults = {
  id: string;
  name: string;
  sortIndex: number;
  thumbnail: string;
};

export type SellerResults = {
  companyImage: string;
  companyName: string;
  id: string;
};

export type CreditState = 'normal' | 'pending' | 'empty' | 'lessThan';

export interface HomeGeneratedProps {
  isPendingAccount: boolean;
  // Credit Data
  loading: boolean;
  creditState: CreditState;
  creditBalance: string;
  // Carousel Data
  featured: string[];
  recentlyAdded: GetBuyerHomepageResponseListingItem[];
  categories: CategoryResults[];
  favourites: GetBuyerHomepageResponseListingItem[];
  favouriteSellers: SellerResults[];
  sellers: SellerResults[];
  loadingHomePage: boolean;
  companyPlan?: GetCompanyPlanResponseData;
  currentMarketSector: string;
  isApprovedCompany: boolean;
  canNegotiate?: boolean;
  negotiationCredit: GetNegotiationCreditRequestResponseItem | undefined;
  showNegoCreditsModal: boolean;
  handleShowNegoCreditsModal: () => void;
  handleShowNegoModal: (listingId: string) => void;
  showNegoModal: boolean;
  clickedRecentListing: GetBuyerHomepageResponseListingItem | undefined;
  handleNegoModalToggle: () => void;
  negotiationPrice: number;
  handleNegotiationPriceSetting: (negotiationPrice: number) => void;
  handleDesiredQuantityChange: (weight: string) => void;
  handleSelectedBoxesWeight: (boxes: Box[], boxesIndex: number) => void;
  handleShowConfirmNegoModal: () => void;
  showConfirmNegoModal: boolean;
  isSendingNegotiation: boolean;
  handleConfirmNegoClick: () => void;
  handleConfirmNegoModalClose: () => void;
  selectedBoxesWeight: Box[];
  productDetailsCard6Props: ProductDetailsCard6Props;
  negotiationWeight: string;
  unit: string | undefined;
  isBeyondCutoff: boolean;
  groupedBox: {
    id: string;
    totalWeight: number;
    cost: number;
    quantity: number;
    boxes: {
      count: number | null;
      id: string;
      quantity: number | null;
      weight: number;
    }[];
    unit: string;
  }[];
  isLoadingListingBoxes: boolean;
  selectedBoxesIndex: number;
  isCreateNegotiationPending: boolean;
  showSuccessfulNegoModal: boolean;
  handleSuccessfulNegoModalToggle: () => void;
}

export interface HomeData {
  bannerData: {
    app: string[];
    web: string[];
  };
  categories: {
    id: string;
    name: string;
    sortIndex: number;
    thumbnail: string;
  }[];
  favouriteListing: GetBuyerHomepageResponseListingItem[];
  favouriteSellers: {
    companyImage: string;
    companyName: string;
    id: string;
  }[];
  recentListing: GetBuyerHomepageResponseListingItem[];
  sellers: {
    companyImage: string;
    companyName: string;
    id: string;
  }[];
}
