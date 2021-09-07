const toKilo: Function = (value: string): number =>
  Math.round((10 * Number(value)) / 1000) / 10;

const toKilogramsRange: Function = (sizeFrom: string, sizeTo: string): string =>
  Number(sizeTo) >= 1000
    ? `${toKilo(sizeFrom) || ''} - ${toKilo(sizeTo) || ''} kg`
    : `${sizeFrom || ''} - ${sizeTo || ''} g`;

const toKilograms: Function = (size: string): string =>
  Number(size) >= 1000 ? `${toKilo(size) || ''} g` : `${size || ''} g`;

export const sizeToString = (
  typeMetric: string,
  sizeFrom?: string,
  sizeTo?: string
): string => {
  if (!sizeFrom || sizeFrom === '') {
    return 'Ungraded';
  }

  switch (typeMetric) {
    case 'Octopus Scale':
    case 'Oyster Grade':
    case 'Numbers':
    case 'Scale':
      return sizeFrom === sizeTo || !sizeTo || sizeTo === ''
        ? `${sizeFrom || ''}`
        : `${sizeFrom || ''} - ${sizeTo || ''}`;
    case 'Portions':
    case 'Grams':
      return sizeFrom === sizeTo || !sizeTo || sizeTo === ''
        ? toKilograms(sizeFrom)
        : toKilogramsRange(sizeFrom, sizeTo);
    case 'Grade':
      return `${sizeFrom || ''}`;
    case 'Units per pound':
      return sizeFrom === sizeTo || !sizeTo || sizeTo === ''
        ? `U${sizeFrom || ''}`
        : `U${sizeFrom || ''}/${sizeTo || ''}`;
    default:
      return '';
  }
};
