import { GenericResponse } from 'types/GenericResponse';

export type GetActivePlanMeta = {
  companyId: string;
};

export type ActivePlanPaymentMethodCard = {
  brand: string;
  expMonth: number;
  expYear: number;
  id: string;
  lastFour: string;
  name: string;
};

export type GetActivePlanResponseData = {
  countdown: number;
  end_date: string;
  id: string;
  is_free_trial: boolean;
  payment_methods: {
    id: string;
    defaultCard: string;
    cards: ActivePlanPaymentMethodCard[];
  };
  plan_alias: string;
  plan_name: string;
  price: string;
  recurring_interval: string;
  start_date: string;
  status: string;
};

// TODO: Update response value
export type GetActivePlanPayload = GenericResponse<GetActivePlanResponseData>;
