import moment from 'moment';

export const formatRunningDateDifference = (
  date = '',
  pick = '',
  retainZeroValues = true
) => {
  const targetDate = moment(date);
  const today = moment();
  const difference = moment.duration(
    targetDate.diff(today, 'seconds'),
    'seconds'
  );
  const remainingDays = difference.days();
  const remainingHours = difference.hours();
  const remainingMinutes = difference.minutes();

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

  if (retainZeroValues) {
    return `${day} ${hours} ${minutes}`;
  }

  return `${remainingDays > 1 ? day + ' ' : ''}${
    remainingHours > 0 ? hours + ' ' : ''
  }${remainingMinutes > 1 ? minutes + ' ' : ''}`;
};

// export const formatRunningDateDifference2 = (date = '', pick = '') => {
//   const targetDate = moment(date);
//   const today = moment();
//   const difference = moment.duration(
//     targetDate.diff(today, 'seconds'),
//     'seconds'
//   );
//   const remainingDays = difference.days();
//   const remainingHours = difference.hours();
//   const remainingMinutes = difference.seconds();

//   const day =
//     remainingDays > 1
//       ? { remaining: remainingDays, format: 'Days' }
//       : `${
//           remainingDays <= 0
//             ? { remaining: 0, format: 'Day' }
//             : { remaining: remainingDays, format: 'Day' }
//         }`;

//   const hours =
//     remainingHours > 1
//       ? { remaining: remainingHours, format: 'Hours' }
//       : `${
//           remainingHours <= 0
//             ? { remaining: 0, format: 'Hour' }
//             : { remaining: remainingHours, format: 'Hour' }
//         }`;

//   const minutes =
//     remainingMinutes > 1
//       ? { remaining: remainingMinutes, format: 'Mins' }
//       : `${
//           remainingMinutes <= 0
//             ? { remaining: 0, format: 'Min' }
//             : { remaining: remainingMinutes, format: 'Min' }
//         }`;
//   const dates: any = {
//     day,
//     hours,
//     minutes,
//   };
//   if (pick) {
//     return dates[pick];
//   }
//   return `${day} ${hours} ${minutes}`;
// };
