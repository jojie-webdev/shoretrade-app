export const formatMeasurementUnit = (unit = '') => {
  if (unit.toUpperCase() === 'DOZEN' || unit.toUpperCase() === 'DOZ') {
    return 'doz';
  }
  return 'kg';
};
