import { GenericResponse } from 'types/GenericResponse';

export type UpgradeSubscriptionMeta = {
  companyId: string;
  subscriptionPlanId?: string;
  payment: {
    existingCard: string;
  };
};

// TODO: Update response value
export type UpgradeSubscriptionPayload = GenericResponse;
