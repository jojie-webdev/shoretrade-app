import { GetBuyerHomepageResponseListingItem } from 'types/store/GetBuyerHomepageState';
import { GetCompanyPlanResponseData } from 'types/store/GetCompanyPlanState';

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
