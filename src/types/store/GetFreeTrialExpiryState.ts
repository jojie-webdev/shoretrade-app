import { GenericResponse } from 'types/GenericResponse';

export type GetFreeTrialExpiryMeta = {
  // TODO: Add request values
};

export type GetFreeTrialExpiryResponseData = {
  isFreeTrial: boolean;
  countdown: number;
  subscriptionStartDate: string;
  subscriptionEndDate: string;
};

// TODO: Update response value
export type GetFreeTrialExpiryPayload = GenericResponse<
  GetFreeTrialExpiryResponseData
>;
