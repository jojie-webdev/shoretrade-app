import { useTheme as useThemeBase } from 'emotion-theming';
import { Theme } from 'types/Theme';

export const useTheme = (): Theme => useThemeBase();

const basisfontWeightMapping: { [s: string]: number } = {
  Light: 300,
  Regular: 400,
  Medium: 500,
  Bold: 700,
  Black: 900,
};

const generateFontStyles = (
  fontName: string,
  fontWeightMapping: { [s: string]: number }
) => {
  return Object.keys(fontWeightMapping).reduce(
    (acc, fontWeight) => ({
      ...acc,
      [fontWeight]: `
          font-family: ${fontName};
          font-weight: ${fontWeightMapping[fontWeight]};
        `,
      [`${fontWeight}Italic`]: `
          font-family: ${fontName};
          font-weight: ${fontWeightMapping[fontWeight]};
          font-style: italic;
        `,
    }),
    {}
  );
};

export const theme: Theme = {
  appType: 'seller', // should be overriden on provider level
  brand: {
    primary: '#E35D32',
    secondary: '#B6B4CA',
    info: '#1877F2',
    success: '#00C48C',
    warning: '#FFCF5C',
    error: '#F23742',
  },
  grey: {
    shade1: '#F9FAFF',
    shade2: '#EDEFFA',
    shade3: '#E5E9F5',
    shade5: '#BBC2DC',
    shade6: '#7F8498',
    shade7: '#565A6A',
    shade8: '#111E2B',
    shade9: '#09131D',
    noshade: '#FFFFFF',
  },
  fonts: {
    BasisGrotesquePro: generateFontStyles(
      'Basis Grotesque Pro',
      basisfontWeightMapping
    ) as Theme['fonts']['BasisGrotesquePro'],
  },
};

export default theme;
