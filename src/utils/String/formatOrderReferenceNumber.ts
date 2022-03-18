export const formatOrderReferenceNumber = (n: number) => {
  const paddedNumber = `00000000${n}`.substr(-8);
  return `#${paddedNumber.substr(0, 4)}-${paddedNumber.substr(4, 4)}`;
};

export const parseOrderReferenceNumber = (value: string) => {
  // check for letters
  const letterExists = /[a-zA-Z]/g;
  if (letterExists.test(value)) {
    return value;
  }

  // check if in reference number format
  if (value[0] === '#') {
    return Number(value.replace('#', '').replace('-', '')).toFixed(0);
  }

  if (!Number.isNaN(Number(value))) {
    return Number(value).toFixed(0);
  }

  return value;
};
