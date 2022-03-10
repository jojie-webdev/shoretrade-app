import moment from 'moment';

export const formatTemplateDeliveryDateLabel = (s: string) => {
  let fromDate, toDate;
  const dateFormat = 'MMM DD';
  switch (s) {
    case 'Next day':
      return moment().add(1, 'day').format(dateFormat);
    case 'Within 2 days':
      fromDate = moment().format(dateFormat);
      toDate = moment().add(2, 'day').format(dateFormat);
      return `${fromDate} to ${toDate}`;
    case 'Between 3 to 5 days':
      fromDate = moment().add(3, 'day').format(dateFormat);
      toDate = moment().add(5, 'day').format(dateFormat);
      return `${fromDate} to ${toDate}`;
    case 'Between 1 to 2 weeks':
      fromDate = moment().add(1, 'week').format(dateFormat);
      toDate = moment().add(2, 'week').format(dateFormat);
      return `${fromDate} to ${toDate}`;
    case 'Between 2 to 4 weeks':
      fromDate = moment().add(2, 'week').format(dateFormat);
      toDate = moment().add(4, 'week').format(dateFormat);
      return `${fromDate} to ${toDate}`;
    case 'Next month':
      return moment().add(1, 'month').format(dateFormat);
    default:
      return s;
  }
};
