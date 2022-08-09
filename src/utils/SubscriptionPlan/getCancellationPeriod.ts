import moment from 'moment';
import { Subscription } from 'types/store/GetCompanyPlanState';

export const getCancellationPeriod = (subscriptionEnd: string | undefined) => {
  if (!subscriptionEnd) {
    return '';
  }

  const daysUntilEnd = moment(moment(subscriptionEnd)).diff(
    moment().startOf('D'),
    'day'
  );

  const hoursUntilEnd = moment(moment(subscriptionEnd)).diff(moment(), 'hours');

  const minutesUntilend = moment(moment(subscriptionEnd)).diff(
    moment(),
    'minutes'
  );

  if (daysUntilEnd > 0) {
    return `in ${daysUntilEnd} days`;
  } else if (hoursUntilEnd > 0) {
    return `in ${hoursUntilEnd} hours`;
  }
  return `in ${minutesUntilend} minutes`;
};
