import { SubscriptionPlanFeature } from 'types/store/GetSubscriptionPlansState';

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
  currentMarketSector: string;
  cancelSubscription: (interval: 'MONTHLY' | 'ANNUAL') => void;
  updateSubscription: (interval: 'MONTHLY' | 'ANNUAL') => void;
  renewSubscription: (interval: 'MONTHLY' | 'ANNUAL') => void;
}
