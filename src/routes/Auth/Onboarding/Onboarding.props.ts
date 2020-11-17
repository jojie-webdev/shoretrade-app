import { SVGProps } from 'components/base/SVG/SVG.props';

export interface OnboardingGeneratedProps {
  currentPage: number;
  onClickNext: () => void;
  onClickSkip: () => void;
  currentData: Data;
}

export type Data = {
  Svg: React.FC<SVGProps>;
  title: string;
  description: string;
};
