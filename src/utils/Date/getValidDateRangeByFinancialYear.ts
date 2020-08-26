import moment from 'moment';

export default (year: number) => {
  const currentDate = moment();
  const proposedStartDate = moment().set({ day: 1, month: 7, year });
  const proposedEndDate = moment().set({ day: 31, month: 6, year: +1 });
  let startDate = {
    dateString: currentDate.format('YYYY-MM-DD'),
    year: currentDate.get('year'),
    month: currentDate.get('month') + 1,
    day: currentDate.get('date'),
  };
  let endDate = {
    dateString: currentDate.format('YYYY-MM-DD'),
    year: currentDate.get('year'),
    month: currentDate.get('month') + 1,
    day: currentDate.get('date'),
  };
  if (currentDate.diff(proposedStartDate) >= 0) {
    startDate = {
      dateString: `${year}-07-01`,
      year,
      month: 7,
      day: 1,
    };
  }
  if (currentDate.diff(proposedEndDate) < 0) {
    endDate = {
      dateString: `${year + 1}-06-31`,
      year: year + 1,
      month: 6,
      day: 31,
    };
  }
  return {
    start: startDate,
    end: endDate,
  };
};
