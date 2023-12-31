import moment from 'moment';
import { GetActivePlanResponseData } from 'types/store/GetActivePlanState';
import { CompanyPlan } from 'types/store/GetCompanyPlanState';

export const getActivePlanStatus = (activePlan: CompanyPlan): string => {
  const startsAt = moment(activePlan.subscription.starts_at).utc();
  const endsAt = moment(activePlan.subscription.ends_at).utc();
  const paymentDelay = moment.utc().diff(startsAt, 'days');
  const isFreeTrial = activePlan.alias.includes('FREE');
  const isPaid = !!activePlan.subscription.paid_at;

  if (activePlan) {
    if (isFreeTrial || isPaid) {
      return 'ACTIVE';
    } else {
      if (paymentDelay < 2) {
        return 'UNSUCCESSFUL';
      } else if (paymentDelay < 5) {
        return 'LATE';
      } else {
        return 'OVERDUE';
      }
    }
  } else {
    if (moment.utc().isSameOrAfter(endsAt)) {
      return 'CANCELLED';
    } else if (isPaid) {
      return 'ACTIVE';
    } else if (paymentDelay < 2) {
      return 'UNSUCCESSFUL';
    } else if (paymentDelay < 5) {
      return 'LATE';
    } else {
      return 'OVERDUE';
    }
  }
};
