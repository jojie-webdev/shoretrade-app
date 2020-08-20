export const formatMeasurementUnit = (unit: string = '') => {
  if (unit.toUpperCase() === 'DOZEN' || unit.toUpperCase() === 'DOZ') {
    return 'doz';
  }
  return 'Kg';
};
