import {
  ActivePlan,
  AddOn,
  CompanyPlan,
  CompanyPlanName,
  PlanFlags,
  Subscription,
} from 'types/store/GetCompanyPlanState';
import {
  GetSubscriptionPlansResponseData,
  SubscriptionPlanFeature,
} from 'types/store/GetSubscriptionPlansState';

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
  planStatus: string;
  nextBillingAmount: number;
  reverseMarketDetails?: AddOn;
  proPlanDetails?: GetSubscriptionPlansResponseData;
  basePlanDetails?: GetSubscriptionPlansResponseData;
  currentPlanDetails?: ActivePlan;
  noActivePlan: boolean;
  currentReverseMarketDetails?: ActivePlan;
  proRataPrice: string;
  latePayment?: boolean;
}

export interface SubscriptionPlanGeneratedProps
  extends SubscriptionPlanTransformOutputProps {
  planInterval: string;
  isDeactivated: boolean;
  currentMarketSector: string;
  flags?: PlanFlags;
  loading: boolean;
  cancelSubscription: (subscriptionPlanId: string) => void;
  companyPlanError: string | undefined;
  updateSubscription: (subscriptionId?: string) => void;
  renewSubscription: (subscriptionPlanId: string) => void;
  revertSubscription: (subscriptionPlanId?: string) => void;
  downgradeSubscription: () => void;
}
