import { GenericResponse } from 'types/GenericResponse';
import { SubscriptionPlanFeature } from 'types/store/GetSubscriptionPlansState';

export type GetCompanyPlanMeta = {
  companyId: string;
};

export type CompanyPlanPaymentMethodCard = {
  brand: string;
  expMonth: number;
  expYear: number;
  id: string;
  lastFour: string;
  name: string;
};

export type CompanyPlanFeature = {
  name: string;
  alias: string;
  user_group: string;
};

export enum CompanyPlanAlias {
  FREE_STANDARD = 'FREE_BASE',
  STANDARD = 'BASE',
  PREMIUM = 'PRO',
  FREE_PREMIUM = 'FREE_PRO',
  FEATURE_REVERSED_MARKETPLACE = 'FEATURE_REVERSED_MARKETPLACE',
  FEATURE_REVERSED_MARKETPLACE_SELLER = 'FEATURE_REVERSED_MARKETPLACE_SELLER',
  FREE_BASE_WITH_REVERSED_MARKETPLACE = 'FREE_BASE_WITH_REVERSED_MARKETPLACE',
}

export enum CompanyPlanName {
  BASE = 'Base',
  PRO = 'Pro',
  REVERSE_MARKET = 'Reversed Marketplace',
}

export type CompanyPlan = {
  id: string;
  name: CompanyPlanName;
  alias: CompanyPlanAlias;
  price: number;
  status: string;
  features: CompanyPlanFeature[];
  created_at: string;
  updated_at: string;
  recurring_interval: string;
  subscription: Subscription;
};

export type ChangePlan = {
  remaining_price: number;
  consumed_price: number;
} & CompanyPlan;

export type SubscriptionPreference = {
  type: string;
  saasInterval?: string;
  isSaasSubscribed: boolean;
};

export type Subscription = {
  id: string;
  ends_at: string;
  paid_at: string;
  renews_at: string | null;
  starts_at: string;
  company_id: string;
  created_at: string;
  is_deleted: boolean;
  updated_at: string;
  is_unsubscribed: boolean;
  subscription_plan_id: string;
};

export type ActivePlan = {
  plan: CompanyPlan;
  company: {
    id: string;
    abn: string;
    name: string;
    credit: number;
    status: string;
    owner_id: string;
    created_at: string;
    market_tag: {
      buying: any[];
    };
    sector: string;
    selling: any[];
    sectorAlias: string;
    updated_at: string;
    is_approved: boolean;
    debt_financing?: any;
    bank_ref_number: number;
    is_free_shipping: boolean;
    subscription_preference: SubscriptionPreference;
  };
  subscription: Subscription;
};

export type PreviousPlans = {
  ends_at: string;
  company_id: string;
  plan: CompanyPlan[];
};

export type AddOn = {
  id: string;
  alias: string;
  name: string;
  price: string;
  recurring_interval?: string;
  features: CompanyPlanFeature[];
  status: string;
  createdAt: string;
  updatedAt: string;
  consumed_price: number;
  remaining_price: number;
};

export type NextBillingCard = {
  id: string;
  name: string;
  brand: string;
  expMonth: number;
  expYear: number;
  lastFour: string;
};

export type PlanFlags = {
  hasCancelledPlan: boolean;
  hasDowngraded: boolean;
  hasCancelledReversedMarketplace: boolean;
  hasPendingPayment: boolean;
  hasUpcomingReversedMarketPlace: boolean;
};

export type GetCompanyPlanResponseData = {
  countdown: number;
  ends_at: string;
  features: SubscriptionPlanFeature[];
  id: string;
  is_free_trial: boolean;
  paid_at?: string;
  payment_methods: {
    id: string;
    defaultCard: string;
    cards: CompanyPlanPaymentMethodCard[];
  };
  plan_alias: string;
  plan_name: string;
  price: string;
  recurring_interval: string;
  starts_at: string;
  activePlans: ActivePlan[];
  previousPlans: PreviousPlans;
  nextBillingData: {
    date: string;
    price: number;
    cards: NextBillingCard[];
    defaultCard: string;
  };
  addOns: AddOn[];
  flags: PlanFlags;
  changePlan: ChangePlan;
};

export enum SubscriptionType {
  PREMIUM = 'PREMIUM',
  STANDARD = 'STANDARD',
}

// TODO: Update response value
export type GetCompanyPlanPayload = GenericResponse<GetCompanyPlanResponseData>;
