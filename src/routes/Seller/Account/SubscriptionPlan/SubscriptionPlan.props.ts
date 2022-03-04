import { GetActivePlanResponseData } from 'types/store/GetActivePlanState';
import { GetSubscriptionPlansResponseData } from 'types/store/GetSubscriptionPlansState';

export interface SubscriptionPlanGeneratedProps {
  plans: GetSubscriptionPlansResponseData[];
  activePlan?: GetActivePlanResponseData;
}
