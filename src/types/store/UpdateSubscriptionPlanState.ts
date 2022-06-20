import { GenericResponse } from 'types/GenericResponse';

export type UpdateSubscriptionPlanMeta = {
  companyId: string;
  saasType: string;
  existingCard: string;
};

// TODO: Update response value
export type UpdateSubscriptionPlanPayload = GenericResponse;
