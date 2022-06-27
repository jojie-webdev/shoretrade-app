import { GenericResponse } from 'types/GenericResponse';
import { CompanyPlanAlias, CompanyPlanName } from './GetCompanyPlanState';

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
  alias: CompanyPlanAlias;
  name: CompanyPlanName;
  price: string;
  recurring_interval: string;
  features: SubscriptionPlanFeature[];
  status: string;
};

export type GetSubscriptionPlansPayload = GenericResponse<
  GetSubscriptionPlansResponseData[]
>;
