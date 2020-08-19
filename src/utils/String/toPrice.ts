import numeral from 'numeral';

export const toPrice = (
  number: number | string,
  showCurrency: boolean = true,
): string =>
  numeral(Number(number)).format(showCurrency ? '$0,0.00' : '0,0.00');
