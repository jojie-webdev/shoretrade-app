export interface SubscriptionPlanTransformOutputProps {
  annualPrice: string;
  monthlyPrice: string;
  nextBillingDate: string;
  cardBrand: string;
  cardNumberMasked: string;
}

export interface SubscriptionPlanGeneratedProps
  extends SubscriptionPlanTransformOutputProps {
  planStatus: string;
  planInterval: string;
  cancelSubscription: (interval: 'MONTHLY' | 'ANNUAL') => void;
  updateSubscription: (interval: 'MONTHLY' | 'ANNUAL') => void;
  renewSubscription: (interval: 'MONTHLY' | 'ANNUAL') => void;
}
