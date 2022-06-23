import moment from 'moment';
import { GetCompanyPlanResponseData } from 'types/store/GetCompanyPlanState';

export const getCompanyPlanStatus = (
  companyPlan: GetCompanyPlanResponseData
): string => {
  const activeSubscription = companyPlan?.activePlans.find((ac) =>
    ['BASE', 'PRO'].includes(ac.plan.name.toUpperCase())
  );
  const startsAt = moment(activeSubscription?.subscription.starts_at).utc();
  const endsAt = moment(activeSubscription?.subscription.ends_at).utc();
  const paymentDelay = moment.utc().diff(startsAt, 'days');
  const isFreeTrial = activeSubscription?.plan.alias.includes('FREE');
  const isPaid = !!activeSubscription?.subscription.paid_at;

  if (companyPlan) {
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
