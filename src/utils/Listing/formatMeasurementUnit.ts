export const formatMeasurementUnit = (unit = '') => {
  if (unit.toUpperCase() === 'PORTIONS') {
    return 'portions';
  }
  if (unit.toUpperCase() === 'DOZEN' || unit.toUpperCase() === 'DOZ') {
    return 'doz';
  }
  return 'kg';
};

export const formatUnitToPricePerUnit = (unit = '') => {
  if (unit.toUpperCase() === 'PORTIONS') {
    return 'portion';
  }
  if (unit.toUpperCase() === 'DOZ' || unit.toUpperCase() === 'DOZEN') {
    return 'doz';
  }
  return 'kg';
};
