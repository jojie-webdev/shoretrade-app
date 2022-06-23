import { GenericResponse } from 'types/GenericResponse';

export type UpdateSubscriptionPlanMeta = {
  companyId: string;
  subscriptionPlanId?: string;
  payment: {
    existingCard: string;
  };
};

// TODO: Update response value
export type UpdateSubscriptionPlanPayload = GenericResponse;
