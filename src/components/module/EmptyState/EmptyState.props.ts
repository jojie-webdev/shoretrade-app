import { SVGProps } from 'components/base/SVG/SVG.props';

export interface EmptyStateProps {
  title: string;
  buttonText: string;
  onButtonClicked: () => void;
  Svg: React.FC<SVGProps>;
}
