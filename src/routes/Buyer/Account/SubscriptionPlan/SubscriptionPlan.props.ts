import {
  ActivePlan,
  AddOn,
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
  reverseMarketDetails?: AddOn;
  proPlanDetails?: CompanyPlan;
  basePlanDetails?: CompanyPlan;
  currentPlanDetails?: ActivePlan;
  noActivePlan: boolean;
  currentReverseMarketDetails?: ActivePlan;
}

export interface SubscriptionPlanGeneratedProps
  extends SubscriptionPlanTransformOutputProps {
  planInterval: string;
  isDeactivated: boolean;
  currentMarketSector: string;
  loading: boolean;
  cancelSubscription: (subscriptionPlanId: string) => void;
  companyPlanError: string | undefined;
  updateSubscription: (subscriptionId: string) => void;
  renewSubscription: () => void;
}
