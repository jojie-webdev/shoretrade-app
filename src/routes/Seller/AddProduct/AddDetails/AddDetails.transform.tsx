import moment from 'moment-timezone';

// only applicable for listing end date since it is AEST
export const combineDateTime = (date: Date, time: Date): Date => {
  const d = moment(date).format('YYYY-MM-DD');
  const t = moment(time).format('HH:mm');
  const result = moment.tz(`${d} ${t}:00`, 'Australia/Brisbane').toDate();
  return result;
};
