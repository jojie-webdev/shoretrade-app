// Australia financial year
import getFiscalYear from 'utils/Date/getFiscalYear';

export default (year = getFiscalYear()) => {
  const startDate = {
    id: `FY${year}`,
    dateString: `${year}-07-01`,
    year,
    month: 7,
    day: 1,
  };

  const endDate = {
    id: `FY${year + 1}`,
    dateString: `${year + 1}-06-30`,
    year: year + 1,
    month: 6,
    day: 30,
  };

  return {
    start: startDate,
    end: endDate,
  };
};
