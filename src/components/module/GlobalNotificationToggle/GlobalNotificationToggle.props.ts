// eslint-disable-next-line prettier/prettier
import { SVGProps } from "components/base/SVG/SVG.props";

export interface GlobalNotificationToggleProps {
  checked: boolean;
  onClick: () => void;
  icon?: JSX.Element;
  title: string;
  description: string;
}
