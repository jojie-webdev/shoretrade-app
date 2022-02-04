const toKilo: Function = (value: string): number =>
  Math.round((10 * Number(value)) / 1000) / 10;

export const formatDecimal: Function = (value: string) => {
  const val = Number(value);
  if (Number.isInteger(val)) {
    return val;
  } else {
    return Math.round(val).toFixed(2);
  }
};

const toKilogramsRange: Function = (sizeFrom: string, sizeTo: string): string =>
  Number(sizeTo) >= 1000
    ? `${toKilo(sizeFrom) || ''} kg - ${toKilo(sizeTo) || ''} kg`
    : `${formatDecimal(sizeFrom) || ''} g - ${formatDecimal(sizeTo) || ''} g`;

const toKilograms: Function = (size: string): string =>
  Number(size) >= 1000
    ? `${toKilo(size) || ''} kg`
    : `${formatDecimal(size) || ''} g`;

export const sizeToString = (
  typeMetric: string,
  sizeFrom?: string | number | null,
  sizeTo?: string | number | null,
  options?: string[]
): string => {
  sizeFrom = sizeFrom ? sizeFrom.toString() : '';
  sizeTo = sizeTo ? sizeTo.toString() : '';

  if ((!sizeFrom || sizeFrom === '') && !options) {
    return 'Ungraded';
  }

  if (options) {
    switch (typeMetric) {
      case 'Oyster Grade':
        if (!sizeFrom || sizeFrom === '') {
          if (options && options.length > 2) {
            return 'Various';
          } else if (options && options.length) {
            return options.join(', ');
          }
          return '';
        }
    }
  }

  switch (typeMetric) {
    case 'Octopus Scale':
    case 'Oyster Grade':
    case 'Numbers':
    case 'Scale':
      return sizeFrom === sizeTo || !sizeTo
        ? `${sizeFrom || ''}`
        : `${sizeFrom || ''} - ${sizeTo || ''}`;
    case 'Portions':
    case 'Grams':
      return !sizeTo
        ? toKilograms(sizeFrom)
        : toKilogramsRange(sizeFrom, sizeTo);
    case 'Grade':
      return `${sizeFrom || ''}`;
    case 'Units per pound':
      return sizeFrom === sizeTo || !sizeTo
        ? `U${sizeFrom || ''}`
        : `U${sizeFrom || ''}/${sizeTo || ''}`;
    default:
      return '';
  }
};
