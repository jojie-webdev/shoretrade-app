import moment from 'moment';

export const formatEstDelivery = (date: Date | string): string => {
  return `Est. Delivery ${moment(date).format('MMM. DD, YYYY')}`;
};
