import { useTheme as useThemeBase } from 'emotion-theming';
import { Theme } from 'types/Theme';

export const useTheme = (): Theme => useThemeBase();

const rootFontSizePx = 16;
export const pxToRem = (n: number): string => `${n / rootFontSizePx}rem`;

export const theme: Theme = {
  appType: 'seller', // should be overridden on provider level
  brand: {
    primary: '#E35D32',
    secondary: '#B6B4CA',
    info: '#5487F5',
    alert: '#FBC034',
    success: '#00C48C',
    warning: '#FFA26B',
    error: '#F23742',
  },
  grey: {
    shade1: '#F9FAFF',
    shade2: '#F4F6FF',
    shade3: '#E5E9F5',
    shade4: '#DADFF2',
    shade5: '#BBC2DC',
    shade6: '#7F8498',
    shade7: '#565A6A',
    shade8: '#111E2B',
    shade9: '#09131D',
    shade10: '#050E16',
    noshade: '#FFFFFF',
  },
  states: {
    hover: '#F96F43',
    pressed: '#DE5124',
  },
};

export default theme;
