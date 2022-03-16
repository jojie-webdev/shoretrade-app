import { GenericResponse } from 'types/GenericResponse';

export type CancelSubscriptionPlanMeta = {
  companyId: string;
  saasInterval: string;
};

export type CancelSubscriptionPlanPayload = GenericResponse;
