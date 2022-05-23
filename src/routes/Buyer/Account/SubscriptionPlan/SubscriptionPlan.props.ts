import { SubscriptionPlanFeature } from 'types/store/GetSubscriptionPlansState';

export interface SubscriptionPlanTransformOutputProps {
  annualPrice: string;
  monthlyPrice: string;
  nextBillingDate: string | null;
  cardBrand: string;
  cardNumberMasked: string | null;
  isSaasSubscribed: boolean;
  subscriptionType: string;
  features: SubscriptionPlanFeature[];
}

export interface SubscriptionPlanGeneratedProps
  extends SubscriptionPlanTransformOutputProps {
  planStatus: string;
  planInterval: string;
  isDeactivated: boolean;
  currentMarketSector: string;
  cancelSubscription: (interval: 'MONTHLY' | 'ANNUAL') => void;
  updateSubscription: (interval: 'MONTHLY' | 'ANNUAL') => void;
  renewSubscription: (interval: 'MONTHLY' | 'ANNUAL') => void;
}
