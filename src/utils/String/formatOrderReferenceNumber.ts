export const formatOrderReferenceNumber = (n: number) => {
  const paddedNumber = `00000000${n}`.substr(-8);
  return `#${paddedNumber.substr(0, 4)}-${paddedNumber.substr(4, 4)}`;
};

export const parseOrderReferenceNumber = (value: string) => {
  // check first if valid referenceNumber other wise return

  if (value.match(/(^[0-9#])/)) {
    let out = '';
    value = value.replace(/\d+$/, (num) => {
      console.log(num);
      out = `${+num}`;
      return out;
    });

    return out;
  } else {
    return value;
  }
};
