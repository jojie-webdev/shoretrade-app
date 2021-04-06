export interface GradientProgressCircleProps {
    percentage: number;
    width?: number;
    strokeWidth?: number;
    strokeLinecap?: 'round' | 'square' | 'butt';
    fontSize?: string;
    fontColor?: string;
    fontFamily?: string;
    primaryColor?: string[];
    secondaryColor?: string;
    fill?: string;
    hidePercentageText?: boolean;
}
