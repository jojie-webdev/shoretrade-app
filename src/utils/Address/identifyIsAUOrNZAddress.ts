export const identifyIsAUOrNZAddress = (address: string) => {
  const splits = address.toLowerCase().split(', ');
  const reversedSplits = splits.reverse();
  let index = reversedSplits.indexOf('australia');

  if (index !== 0) {
    index = reversedSplits.indexOf('new zealand');
  }

  const isAUOrNZ = index === 0;

  return isAUOrNZ;
};
