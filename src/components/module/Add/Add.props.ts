import { SVGProps } from 'components/base/SVG/SVG.props';

export interface AddProps {
  onClick?: () => void;
  title?: string;
  customTitle?: React.ReactNode;
  Svg?: React.FC<SVGProps>;
  onClickImage?: (image: File | null) => void;
  onClickFile?: (file: File | null) => void;
  imageTypeWhiteList?: string[];
  documentTypeWhiteList?: string[];
  inputProps?: any;
  error?: boolean;
}
