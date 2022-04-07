import moment from 'moment';
import { GetActivePlanResponseData } from 'types/store/GetActivePlanState';

export const getActivePlanStatus = (
  activePlan: GetActivePlanResponseData
): string => {
  const startsAt = moment(activePlan.starts_at).utc();
  const endsAt = moment(activePlan.ends_at).utc();
  const paymentDelay = moment.utc().diff(startsAt, 'days');
  const isSubscribed = activePlan.subscription_preference.isSaasSubscribed;
  const isFreeTrial = activePlan.is_free_trial;
  const isPaid = !!activePlan.paid_at;

  if (isSubscribed) {
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
