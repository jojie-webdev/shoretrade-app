import { useTheme as useThemeBase } from 'emotion-theming';
import { Theme } from 'types/Theme';

export const useTheme = (): Theme => useThemeBase();

const rootFontSizePx = 16;
export const pxToRem = (n: number): string => `${n / rootFontSizePx}rem`;

export const theme: Theme = {
  appType: 'seller', // should be overridden on provider level
  isSFM: true,
  brand: {
    primary: '#E35D32',
    secondary: '#30347E',
    info: '#31769D',
    alert: '#E8D743',
    success: '#4AAB5F',
    warning: '#FB7334',
    error: '#E02121',
  },
  grey: {
    shade1: '#F9FBFD',
    shade2: '#F2F6FB',
    shade3: '#DFE9F5',
    shade4: '#CCDCEE',
    shade5: '#BFD3EA',
    shade6: '#7E8DB8',
    shade7: '#464986',
    shade8: '#141530',
    shade9: '#0F1024',
    shade10: '#0A0B18',
    noshade: '#FFFFFF',
  },
  states: {
    hover: '#F96F43',
    pressed: '#DE5124',
  },
};

export default theme;
