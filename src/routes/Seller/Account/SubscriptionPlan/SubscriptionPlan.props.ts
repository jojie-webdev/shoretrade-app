import { SubscriptionPlanFeature } from 'types/store/GetSubscriptionPlansState';
import { UserCompany } from 'types/store/GetUserState';

export interface SubscriptionPlanTransformOutputProps {
  annualPrice: string;
  monthlyPrice: string;
  nextBillingDate: string;
  cardBrand: string;
  cardNumberMasked: string;
  subscriptionType: string;
  features: SubscriptionPlanFeature[];
}

export interface SubscriptionPlanGeneratedProps
  extends SubscriptionPlanTransformOutputProps {
  planStatus: string;
  planInterval: string;
  company?: UserCompany;
  currentMarketSector: string;
  cancelSubscription: (interval: 'MONTHLY' | 'ANNUAL') => void;
  updateSubscription: (interval: 'MONTHLY' | 'ANNUAL') => void;
  renewSubscription: (interval: 'MONTHLY' | 'ANNUAL') => void;
}
