import { GenericResponse } from 'types/GenericResponse';

export type CancelSubscriptionPlanMeta = {
  companyId: string;
  subscriptionPlanId?: string;
};

export type CancelSubscriptionPlanPayload = GenericResponse;
