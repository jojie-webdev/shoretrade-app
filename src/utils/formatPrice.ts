export const formatPrice = (
  price: string | number,
  currencySymbol: string
): string => {
  let formattedPrice = String(price);

  // checks if price is already formatted
  if (formattedPrice.split(currencySymbol).length === 1) {
    formattedPrice = `${currencySymbol} ${formatPrice}`;
  }

  // check if has decimal value?
  if (formattedPrice.split('.').length === 1) {
    formattedPrice += '.00';
  }

  return formattedPrice;
};
