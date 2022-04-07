export interface SubscriptionPlanTransformOutputProps {
  annualPrice: string;
  monthlyPrice: string;
  nextBillingDate: string | null;
  cardBrand: string;
  cardNumberMasked: string | null;
  isSaasSubscribed: boolean;
}

export interface SubscriptionPlanGeneratedProps
  extends SubscriptionPlanTransformOutputProps {
  planStatus: string;
  planInterval: string;
  isDeactivated: boolean;
  cancelSubscription: (interval: 'MONTHLY' | 'ANNUAL') => void;
  updateSubscription: (interval: 'MONTHLY' | 'ANNUAL') => void;
  renewSubscription: (interval: 'MONTHLY' | 'ANNUAL') => void;
}
