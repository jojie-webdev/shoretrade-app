import numeral from 'numeral';

export const toPrice = (number: number | string, showCurrency = true): string =>
  numeral(Number(number)).format(showCurrency ? '$0,0.00' : '0,0.00');

export default toPrice
