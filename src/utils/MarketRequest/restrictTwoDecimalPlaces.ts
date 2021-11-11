export const restrictTwoDecimalPlaces = (value: string) => {
  if (!Number.isNaN(Number(value))) {
    let fv = value;
    if (fv.indexOf('.') >= 0) {
      fv = fv.substr(0, fv.indexOf('.')) + fv.substr(fv.indexOf('.'), 3);
    }
    return `${parseFloat(fv)}`;
  }
  return '';
};
