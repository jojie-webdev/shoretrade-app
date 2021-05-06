import moment from 'moment';

export const combineDateTime = (date: Date, time: Date): Date => {
  const d = moment(date).format('YYYY-MM-DD');
  const t = moment(time).format('HH:mm');
  return moment(`${d} ${t}:00`).toDate();
};
