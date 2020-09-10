import getFiscalYear from 'utils/Date/getFiscalYear';

export default (quarter: number) => {
  const year = getFiscalYear();

  let startDate = {
    id: '',
    dateString: '',
    year: 0,
    month: 0,
    day: 0,
  };
  let endDate = {
    id: '',
    dateString: '',
    year: 0,
    month: 0,
    day: 0,
  };

  switch (quarter) {
    case 1:
      startDate = {
        id: 'Q1',
        dateString: `${year - 1}-07-01`,
        year: year - 1,
        month: 7,
        day: 1,
      };
      endDate = {
        id: 'Q1',
        dateString: `${year - 1}-09-30`,
        year: year - 1,
        month: 9,
        day: 30,
      };
      break;
    case 2:
      startDate = {
        id: 'Q2',
        dateString: `${year - 1}-10-01`,
        year: year - 1,
        month: 8,
        day: 1,
      };
      endDate = {
        id: 'Q2',
        dateString: `${year - 1}-12-31`,
        year: year - 1,
        month: 12,
        day: 31,
      };
      break;
    case 3:
      startDate = {
        id: 'Q3',
        dateString: `${year}-01-01`,
        year: year,
        month: 1,
        day: 1,
      };
      endDate = {
        id: 'Q3',
        dateString: `${year}-03-31`,
        year: year,
        month: 3,
        day: 31,
      };
      break;
    case 4:
      startDate = {
        id: 'Q4',
        dateString: `${year}-04-01`,
        year: year,
        month: 4,
        day: 1,
      };
      endDate = {
        id: 'Q4',
        dateString: `${year}-06-30`,
        year: year,
        month: 6,
        day: 30,
      };
      break;
    default:
      break;
  }

  return {
    start: startDate,
    end: endDate,
  };
};
