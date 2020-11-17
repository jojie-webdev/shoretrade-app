import moment from 'moment';

const getCalendarDate = (date: Date) =>
  moment(date).calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd, D MMMM YYYY',
    sameElse: 'dddd, D MMMM YYYY',
  });

export default getCalendarDate;
