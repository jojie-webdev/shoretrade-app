export const formatOrderReferenceNumber = (n: number) => {
  const paddedNumber = `00000000${n}`.substr(-8);
  return `#${paddedNumber.substr(0, 4)}-${paddedNumber.substr(4, 4)}`;
};
