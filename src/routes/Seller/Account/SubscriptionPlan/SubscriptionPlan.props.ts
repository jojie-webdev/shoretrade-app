import {
  ActivePlan,
  AddOn,
  CompanyPlanName,
  GetCompanyPlanResponseData,
  PlanFlags,
} from 'types/store/GetCompanyPlanState';
import {
  GetSubscriptionPlansResponseData,
  SubscriptionPlanFeature,
} from 'types/store/GetSubscriptionPlansState';
import { UserCompany } from 'types/store/GetUserState';

export interface SubscriptionPlanTransformOutputProps {
  annualPrice: string;
  monthlyPrice: string;
  nextBillingDate: string | null;
  cancellationReversePeriodReverseMarket: string | null;
  cardBrand: string;
  cardNumberMasked: string | null;
  isSaasSubscribed: boolean;
  subscriptionType: CompanyPlanName;
  features: SubscriptionPlanFeature[];
  planStatus: string;
  nextBillingAmount: number;
  reverseMarketPlanDetails?: GetSubscriptionPlansResponseData;
  reverseMarketAddOnDetails?: AddOn;
  currentPlanDetails?: ActivePlan;
  noActivePlan: boolean;
  currentReverseMarketDetails?: ActivePlan;
}

export interface SubscriptionPlanGeneratedProps
  extends SubscriptionPlanTransformOutputProps {
  planStatus: string;
  planInterval: string;
  company?: UserCompany;
  flags?: PlanFlags;
  currentMarketSector: string;
  updateSubscription: (subscriptionId?: string) => void;
  renewSubscription: (subscriptionPlanId: string) => void;
  cancelSubscription: (subscriptionPlanId: string) => void;
}
