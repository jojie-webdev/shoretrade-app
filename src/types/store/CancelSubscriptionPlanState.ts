import { GenericResponse } from 'types/GenericResponse';

export type CancelSubscriptionPlanMeta = {
  companyId: string;
  subscriptionAlias: string;
};

export type CancelSubscriptionPlanPayload = GenericResponse;
