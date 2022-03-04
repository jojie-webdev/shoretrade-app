import { GenericResponse } from 'types/GenericResponse';

export type GetActivePlanMeta = {
  companyId: string;
};

export type GetActivePlanResponseData = {
  id: string;
  plan_name: string;
  plan_alias: string;
  recurring_interval: string;
  price: string;
  status: string;
  start_date: string;
  end_date: string;
  is_free_trial: boolean;
  countdown: number;
};

// TODO: Update response value
export type GetActivePlanPayload = GenericResponse<GetActivePlanResponseData>;
