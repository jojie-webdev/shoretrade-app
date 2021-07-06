export enum PACKAGING {
  polystyrene = 'POLYSTYRENE',
  sfm = 'SFM',
  custom = 'CUSTOM',
}

export const CHOICES = [
  {
    title: 'Polystyrene',
    subtitle: 'Get access to more buyers!',
    value: PACKAGING.polystyrene,
  },
  {
    title: 'SFM Crates',
    subtitle: 'Road freight only',
    value: PACKAGING.sfm,
  },
  {
    title: 'My Own Packaging',
    subtitle: 'Enter custom sizes',
    value: PACKAGING.custom,
  },
];
