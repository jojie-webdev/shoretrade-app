/**
 * Round off and converts value to number otherwise return null,
 * useful for getting rid of floating point issues and when displaying price to invoice
 * @param {string | number } numberString
 */
export const parsePrice = (numberString: string | number) => {
  if (Number.isNaN(numberString)) {
    return null;
  }

  return +(+(+numberString).toFixed(4)).toFixed(2);
};
