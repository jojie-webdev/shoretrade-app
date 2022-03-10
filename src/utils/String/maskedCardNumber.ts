export const toMaskedCardNumber = (brand: string, lastFour: string) => {
  const cardNumberFormat =
    brand === 'american_express' || brand === 'American Express'
      ? `**** ****** *-`
      : `**** **** **** -`;

  return cardNumberFormat.replace('-', lastFour || '');
};
