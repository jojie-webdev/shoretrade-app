import moment from 'moment';
import { isEmpty } from 'ramda';

export const getGraphData = (data: any, from: string) => {
  const dates = data.paidGraph.date;
  const values = data.paidGraph.increase.map((v: string) => parseFloat(v));

  const getMonth = (n: number) => {
    if (n >= 9) {
      return n + 1;
    }
    return `0${n + 1}`;
  };

  //first
  const month = moment(from).month();
  const year = moment(from).year();
  const lastDayOfMonth = moment(from).endOf('month').date();
  const firstDay = `${year}-${getMonth(month)}-01`;

  //last
  let lastDay = `${year}-${getMonth(month)}-${lastDayOfMonth}`;

  if (dates.length > 1) {
    const lastDateOnData = dates[dates.length - 1];

    if (moment(lastDateOnData).isAfter(moment(lastDay))) {
      const monthLast = moment(lastDateOnData).month();
      const yearLast = moment(lastDateOnData).year();
      const lastDayOfMonthLast = moment(lastDateOnData).endOf('month').date();

      lastDay = `${yearLast}-${getMonth(monthLast)}-${lastDayOfMonthLast}`;
    }
  }

  if (!isEmpty(dates) && !isEmpty(values)) {
    const firstDayFound = dates.find((d: string) => d.includes(firstDay));
    const lastDayFound = dates.find((d: string) => d.includes(lastDay));

    let finalDates = [...dates];
    let finalValues = [...values];
    if (!firstDayFound) {
      finalDates = [firstDay, ...finalDates];
      finalValues = [finalValues[0], ...finalValues];
    }

    if (!lastDayFound) {
      finalDates = [...finalDates, lastDay];
      finalValues = [...finalValues, finalValues[finalValues.length - 1]];
    }

    return {
      dates: finalDates,
      values: finalValues,
    };
  }

  return {
    dates: [firstDay, lastDay],
    values: [0, 0],
  };
};
