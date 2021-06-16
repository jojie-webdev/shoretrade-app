import moment from 'moment';
import { isEmpty } from 'ramda';
import { MarketFilters } from 'routes/Seller/MarketPriceDetail/MarketPriceDetail.props';

export const getGraphData = (data: any) => {
  const dates = data.graphData.date;
  const values = data.graphData.increase.map((v: string) => parseFloat(v));

  const getMonth = (n: number) => {
    if (n >= 9) {
      return n + 1;
    }
    return `0${n + 1}`;
  };

  const sixMonthsAgo = moment().subtract(6, 'M');
  const monthEarlier = sixMonthsAgo.month();
  const yearEarlier = sixMonthsAgo.year();
  const firstDay = `${yearEarlier}-${getMonth(monthEarlier)}-01`;

  const monthNow = moment().month();
  const yearNow = moment().year();
  const lastDayOfMonth = moment().endOf('month').date();
  const lastDay = `${yearNow}-${getMonth(monthNow)}-${lastDayOfMonth}`;

  if (!isEmpty(dates) && !isEmpty(values)) {
    const firstDayFound = dates.find((d: string) => d.includes(firstDay));
    const lastDayFound = dates.find((d: string) => d.includes(lastDay));

    let finalDates = [...dates];
    let finalValues = [...values];
    if (!firstDayFound) {
      finalDates = [firstDay, ...finalDates];
      finalValues = [finalValues[0], ...finalValues];
    }

    if (
      !lastDayFound &&
      moment(lastDay).isAfter(moment(finalDates[finalDates.length - 1]))
    ) {
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

export const getFilters = (data: any) => {
  const { filters }: { filters: MarketFilters } = data;
  const {
    metric,
    region,
    sizeFrom,
    sizeTo,
    stateOne,
    stateTwo,
    stateThree,
  } = filters;

  const isGrams = metric === 'Grams';
  const isUngraded = sizeFrom === null || isEmpty(sizeFrom);

  const getRegion = () => region.map((r) => r.region);
  const getStates = (state: { id: string; value: string }[]) =>
    state.map((s) => s.value);

  const getSizeMinMax = () => {
    return typeof sizeFrom === 'number' && typeof sizeTo === 'number'
      ? // ? [String(sizeFrom / 1000), String(1000 / 1000)]
        [String(sizeFrom / 1000), 100] // 100kg
      : null;
  };
  const getSizeDropdownValues = () => {
    return {
      from:
        typeof sizeFrom === 'object'
          ? sizeFrom.map((sf) => ({ label: sf, value: sf }))
          : [],
      to:
        typeof sizeTo === 'object'
          ? sizeTo.map((st) => ({ label: st, value: st }))
          : [],
    };
  };

  const initialFilters = [
    { label: 'Catchment Area', type: 'choice', values: getRegion() },
    !isUngraded
      ? {
          ...(isGrams
            ? {
                label: 'Size',
                type: 'size_input',
                values: getSizeMinMax(),
                unit: 'kg',
              }
            : {
                label: 'Size',
                type: 'size_dropdown',
                sizeDropdownValues: getSizeDropdownValues(),
              }),
        }
      : {},
    { label: 'State One', type: 'choice', values: getStates(stateOne) },
    { label: 'State Two', type: 'choice', values: getStates(stateTwo) },
    { label: 'State Three', type: 'choice', values: getStates(stateThree) },
  ];

  return initialFilters.reduce((acc, cur) => {
    if (cur.values && !isEmpty(cur.values)) {
      // @ts-ignore
      acc.push(cur);
    } else if (cur.label === 'Size') {
      // @ts-ignore
      acc.push(cur);
    }
    return acc;
  }, []);
};

export const getRegion = (data: any, selectedFilters: any[]) => {
  const { filters }: { filters: MarketFilters } = data;

  const region = filters.region.find((r) => selectedFilters.includes(r.region));

  return region ? region.region : null;
};

export const getStateId = (
  data: any,
  selectedFilters: any[],
  type: 'stateOne' | 'stateTwo' | 'stateThree'
) => {
  const { filters }: { filters: MarketFilters } = data;

  const state = filters[type].find((s) => selectedFilters.includes(s.value));

  return state ? state.id : null;
};

export const getSize = (data: any, selectedSize: string | null) => {
  if (selectedSize) {
    const { filters }: { filters: MarketFilters } = data;
    const { metric } = filters;
    const sizeFrom = selectedSize.substring(0, selectedSize.indexOf('-') - 1);
    const sizeTo = selectedSize.substring(selectedSize.indexOf('-') + 2);

    if (metric === 'Grams') {
      const gramSizeFrom = Number(sizeFrom) * 1000;
      const gramSizeTo = Number(sizeTo) * 1000;

      return {
        sizeFrom: gramSizeFrom,
        sizeTo: gramSizeTo,
      };
    }

    return {
      sizeFrom,
      sizeTo,
    };
  }

  return {
    sizeFrom: null,
    sizeTo: null,
  };
};
