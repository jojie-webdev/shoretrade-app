import { isEmpty } from 'ramda';

// check GetBuyerSearchFilterDataPayload for type
export const getFilters = (data: any) => {
  const filterData = data.data?.data;
  if (!filterData) return [];

  const { typeMetric, origin, sizeFrom, sizeTo, specifications } = filterData;

  const isGrams = typeMetric === 'Grams';

  const getCatchmentArea = () => origin.map((o: any) => o);
  const getStates = (groupOption: number) => {
    const states = specifications
      .flat()
      .filter((fs: { groupOption: number }) => fs.groupOption === groupOption);

    return states.map((s: { state: { name: any } }) => s.state.name);
  };

  const getSizeMinMax = () => {
    return typeof sizeFrom === 'number' && typeof sizeTo === 'number'
      ? [String(sizeFrom / 1000), String(sizeTo / 1000)]
      : null;
  };
  const getSizeDropdownValues = () => {
    return {
      from:
        typeof sizeFrom === 'object'
          ? sizeFrom && sizeFrom.map((sf: any) => ({ label: sf, value: sf }))
          : [],
      to:
        typeof sizeTo === 'object'
          ? sizeTo && sizeTo.map((st: any) => ({ label: st, value: st }))
          : [],
    };
  };

  const initialFilters = [
    { label: 'Catchment Area', type: 'choice', values: getCatchmentArea() },
    {
      ...(isGrams
        ? {
            label: 'Size',
            type: 'size_input',
            values: getSizeMinMax(),
            unit: 'Kg',
          }
        : {
            label: 'Size',
            type: 'size_dropdown',
            sizeDropdownValues: getSizeDropdownValues(),
          }),
    },
    { label: 'State One', type: 'choice', values: getStates(1) },
    { label: 'State Two', type: 'choice', values: getStates(2) },
    { label: 'State Three', type: 'choice', values: getStates(3) },
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

export const getCatchmentArea = (data: any, selectedFilters: any[]) => {
  const filterData = data.data?.data;
  if (!filterData) return null;

  const catchmentArea = filterData.origin.find((o: any) =>
    selectedFilters.includes(o)
  );

  return catchmentArea || null;
};

export const getSpecifications = (data: any, selectedFilters: any[]) => {
  const filterData = data.data?.data;
  if (!filterData) return null;

  const { specifications } = filterData;

  const states = specifications
    .flat()
    .filter((s: { state: { name: any } }) =>
      selectedFilters.includes(s.state.name)
    );

  const stateIds = states
    .map((sid: { state: { id: any } }) => sid.state.id)
    .join();

  return stateIds || null;
};

export const getSize = (data: any, selectedSize: string | null) => {
  if (selectedSize) {
    const filterData = data.data.data;
    const { typeMetric } = filterData;
    const sizeRangeFrom = selectedSize.substring(
      0,
      selectedSize.indexOf('-') - 1
    );
    const sizeRangeTo = selectedSize.substring(selectedSize.indexOf('-') + 2);

    if (typeMetric === 'Grams') {
      const gramSizeFrom = Number(sizeRangeFrom) * 1000;
      const gramSizeTo = Number(sizeRangeTo) * 1000;

      return {
        sizeRangeFrom: gramSizeFrom,
        sizeRangeTo: gramSizeTo,
      };
    }

    return {
      sizeRangeFrom,
      sizeRangeTo,
    };
  }

  return {
    sizeRangeFrom: null,
    sizeRangeTo: null,
  };
};
