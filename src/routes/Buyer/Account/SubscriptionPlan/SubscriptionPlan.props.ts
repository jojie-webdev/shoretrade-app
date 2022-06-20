import { SubscriptionPlanFeature } from 'types/store/GetSubscriptionPlansState';

export interface SubscriptionPlanTransformOutputProps {
  annualPrice: string;
  monthlyPrice: string;
  nextBillingDate: string | null;
  cancellationPeriod: string | null;
  cardBrand: string;
  cardNumberMasked: string | null;
  isSaasSubscribed: boolean;
  subscriptionType: 'PREMIUM' | 'STANDARD';
  features: SubscriptionPlanFeature[];
}

export interface SubscriptionPlanGeneratedProps
  extends SubscriptionPlanTransformOutputProps {
  planStatus: string;
  planInterval: string;
  isDeactivated: boolean;
  currentMarketSector: string;
  cancelSubscription: () => void;
  updateSubscription: (
    interval: 'MONTHLY' | 'ANNUAL',
    type: 'PREMIUM' | 'STANDARD'
  ) => void;
  renewSubscription: (interval: 'MONTHLY' | 'ANNUAL') => void;
}
