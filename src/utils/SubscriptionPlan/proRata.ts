import { ChangePlan, CompanyPlan } from 'types/store/GetCompanyPlanState';

/**
 * Compute Pro Rata
 * @param plan
 */
export const proRata = (plan: ChangePlan): number => {
  // remaining_price - consume
  return plan.remaining_price - plan.consumed_price;
};
