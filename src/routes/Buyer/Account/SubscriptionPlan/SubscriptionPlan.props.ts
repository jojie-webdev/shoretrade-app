import {
  CompanyPlan,
  CompanyPlanName,
  Subscription,
} from 'types/store/GetCompanyPlanState';
import { SubscriptionPlanFeature } from 'types/store/GetSubscriptionPlansState';

export interface SubscriptionPlanTransformOutputProps {
  annualPrice: string;
  monthlyPrice: string;
  nextBillingDate: string | null;
  cancellationPeriod: string | null;
  cardBrand: string;
  cardNumberMasked: string | null;
  isSaasSubscribed: boolean;
  subscriptionType: CompanyPlanName;
  features: SubscriptionPlanFeature[];
  hasCancelled?: Subscription;
  planStatus: string;
  nextBillingAmount: number;
  reverseMarketPrice: number;
  proPlanDetails?: CompanyPlan;
  basePlanDetails?: CompanyPlan;
  noActivePlan: boolean;
}

export interface SubscriptionPlanGeneratedProps
  extends SubscriptionPlanTransformOutputProps {
  planInterval: string;
  isDeactivated: boolean;
  currentMarketSector: string;
  cancelSubscription: () => void;
  companyPlanError: string | undefined;
  updateSubscription: (subscriptionId: string) => void;
  renewSubscription: () => void;
}
