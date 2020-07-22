import { useTheme as useThemeBase } from 'emotion-theming';
import { Theme } from 'types/Theme';

export const useTheme = (): Theme => useThemeBase();

export const theme: Theme = {};

export default theme;
