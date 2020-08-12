import { SVGProps } from 'components/base/SVG/SVG.props';

export interface AddProps {
  onClick: () => void;
  title: string;
  Svg: React.FC<SVGProps>;
}
