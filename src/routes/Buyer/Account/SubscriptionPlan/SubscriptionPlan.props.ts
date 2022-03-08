import { GetActivePlanResponseData } from 'types/store/GetActivePlanState';
import { GetSubscriptionPlansResponseData } from 'types/store/GetSubscriptionPlansState';

export interface SubscriptionPlanGeneratedProps {
  annualPrice: string;
  monthlyPrice: string;
  nextBillingDate: string;
  cardBrand: string;
  cardNumberMasked: string;
}
