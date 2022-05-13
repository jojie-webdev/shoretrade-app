import { GetSubscriptionPlansResponseData } from 'types/store/GetSubscriptionPlansState';

export interface YourPlanrops {
  currentMarketSector: string;
  previousStep: () => void;
  selectedPlan?: string;
  additionalSubscriptionHandler: (value: boolean) => void;
}

export interface YourPlanGeneratedProps {
  currentMarketSector: string;
  previousStep: () => void;
  currentPlan?: GetSubscriptionPlansResponseData;
  selectedPlan?: string;
  additionalSubscriptionHandler: (value: boolean) => void;
}
