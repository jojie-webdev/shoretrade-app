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
  ends_at: string;
  id: string;
  is_free_trial: boolean;
  paid_at?: string;
  payment_methods: {
    id: string;
    defaultCard: string;
    cards: ActivePlanPaymentMethodCard[];
  };
  plan_alias: string;
  plan_name: string;
  price: string;
  recurring_interval: string;
  starts_at: string;
  subscription_preference: {
    saasInterval: string;
    isSaasSubscribed: boolean;
  };
};

// TODO: Update response value
export type GetActivePlanPayload = GenericResponse<GetActivePlanResponseData>;
