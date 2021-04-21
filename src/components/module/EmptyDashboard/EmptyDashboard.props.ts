import { SVGProps } from 'components/base/SVG/SVG.props';

export interface EmptyDashboardProps {
  buttonText?: string;
  fluid?: boolean;
  onButtonClicked?: () => void;
  Svg: React.FC<SVGProps>;
  height?: number;
  width?: number;
  circleHeight?: number;
  circleWidth?: number;
}
