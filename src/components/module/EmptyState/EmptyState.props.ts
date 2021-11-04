import { SVGProps } from 'components/base/SVG/SVG.props';

export interface EmptyStateProps {
  title?: string;
  buttonText?: string;
  fluid?: boolean;
  onButtonClicked?: () => void;
  AnimatedSvg?: string;
  Svg?: React.FC<SVGProps>;
  height?: number;
  width?: number;
  containerHeight?: number;
  containerWidth?: number;
  circleHeight?: number;
  circleWidth?: number;
  textAlign?: 'left' | 'right' | 'center';
}
