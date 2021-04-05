export const formatMeasurementUnit = (unit = '') => {
  if (unit.toUpperCase() === 'PORTIONS') {
    return 'portions';
  }
  if (unit.toUpperCase() === 'DOZEN' || unit.toUpperCase() === 'DOZ') {
    return 'doz';
  }
  if (unit.toUpperCase() === 'GRAMS' || unit.toUpperCase() === 'G') {
    return 'g';
  }
  return 'kg';
};

export const formatUnitToPricePerUnit = (unit = '') => {
  if (unit.toUpperCase() === 'PORTIONS') {
    return 'portion';
  }
  if (unit.toUpperCase() === 'DOZ') {
    return 'doz';
  }
  return 'kg';
};
