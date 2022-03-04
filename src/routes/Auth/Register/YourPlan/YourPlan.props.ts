import { GetSubscriptionPlansResponseData } from 'types/store/GetSubscriptionPlansState';

export interface YourPlanrops {
  currentMarketSector: string;
  previousStep: () => void;
}

export interface YourPlanGeneratedProps {
  currentMarketSector: string;
  previousStep: () => void;
  currentPlan?: GetSubscriptionPlansResponseData;
}
