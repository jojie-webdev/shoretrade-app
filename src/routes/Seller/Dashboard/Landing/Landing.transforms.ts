import moment from 'moment';
import groupBy from 'ramda/es/groupBy';
import isEmpty from 'ramda/es/isEmpty';

import {
  MonthlyGraph,
  TopCategoriesData,
  TopCategoriesPercentageData,
} from './Landing.props';

export const getGraphData = (data: any, from: string) => {
  const dates = data.graphData.date;
  const values = data.graphData.increase.map((v: string) => parseFloat(v));

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
      finalValues = [0, ...finalValues];
    }

    if (!lastDayFound) {
      finalDates = [...finalDates, lastDay];
      finalValues = [...finalValues, 0];
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

const groupByMonth: any = groupBy((data: { date: string }) =>
  moment(data.date).format('YYYY-MM')
);

const calculatePercentChangeInPrice = (initial: number, last: number) => {
  if (initial === 0 && last > 0) {
    return '100.00';
  }

  if (initial === 0 && last === 0) {
    return '0.00';
  }

  return (((last - initial) / initial) * 100).toFixed(2);
};

export const salesDataToMonthlyGraph = (
  data: { date: string; paid: number; pending: number }[],
  previousMonthTotal: { paid: number; pending: number }
): MonthlyGraph => {
  const previousDateData = data.filter((a) => moment(a.date) < moment());
  const groupedByMonth = groupByMonth(previousDateData);
  const monthlyData = Object.keys(groupedByMonth).reduce((accumA: any, key) => {
    return [
      ...accumA,
      {
        graphData: groupedByMonth[key].reduce(
          (accumB: any, current: { paid: number; date: string }) => {
            return {
              date: [...accumB.date, current.date],
              increase: [...accumB.increase, current.paid],
            };
          },
          {
            date: [],
            increase: [],
          }
        ),
        startDate: moment(key + '-01', 'YYYY-MM-DD')
          .startOf('day')
          .toISOString(),
        percentage: '0',
        total: groupedByMonth[key].reduce(
          (accumB: number, current: { paid: number }) => accumB + current.paid,
          0
        ),
      },
    ];
  }, []);

  const monthlyDataWithPercentage = monthlyData.map(
    (current: any, index: number) => ({
      ...current,
      percentage:
        index === 0
          ? calculatePercentChangeInPrice(
              previousMonthTotal.paid,
              current.total
            )
          : calculatePercentChangeInPrice(
              monthlyData[index - 1].total,
              current.total
            ),
    })
  );

  return monthlyDataWithPercentage;
};

export const includeTopCategoriesPercentChange = (
  data: TopCategoriesData
): TopCategoriesPercentageData => {
  return data.topCategories.map((a) => {
    const previousData = data.previousTopCategories.find(
      (b) => b.id === a.id
    ) || { total: 0 };

    const previousTotal = previousData.total;

    return {
      ...a,
      percentageChange: calculatePercentChangeInPrice(previousTotal, a.total),
    };
  });
};
