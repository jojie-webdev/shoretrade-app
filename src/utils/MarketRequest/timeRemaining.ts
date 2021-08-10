import moment from 'moment';

export const formatRunningDateDifference = (date = '', pick = '') => {
  const targetDate = moment(date);
  const today = moment();
  const difference = moment.duration(
    targetDate.diff(today, 'seconds'),
    'seconds'
  );
  const remainingDays = difference.days();
  const remainingHours = difference.hours();
  const remainingMinutes = difference.seconds();

  const day =
    remainingDays > 1
      ? `${remainingDays} Days`
      : `${remainingDays <= 0 ? 0 : remainingDays} Day`;

  const hours =
    remainingHours > 1
      ? `${remainingHours} Hours`
      : `${remainingHours <= 0 ? 0 : remainingHours} Hour`;

  const minutes =
    remainingMinutes > 1
      ? `${remainingMinutes} Mins`
      : `${remainingMinutes <= 0 ? 0 : remainingMinutes} Min`;
  const dates: any = {
    day,
    hours,
    minutes,
  };
  if (pick) {
    return dates[pick];
  }
  return `${day} ${hours} ${minutes}`;
};
