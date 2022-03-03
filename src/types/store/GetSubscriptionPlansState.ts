import { GenericResponse } from 'types/GenericResponse';

export type GetSubscriptionPlansMeta = {
  // TODO: Add request values
};

export type SubscriptionPlanFeature = {
  name: string;
  alias: string;
  user_group: string;
};

export type GetSubscriptionPlansResponseData = {
  id: string;
  alias: string;
  name: string;
  price: string;
  recurring_interval: string;
  features: SubscriptionPlanFeature[];
  status: string;
};

export type GetSubscriptionPlansPayload = GenericResponse<
  GetSubscriptionPlansResponseData[]
>;
