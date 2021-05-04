import { InteractionsProps } from "components/base/Interactions/Interactions.props";
import { SVGProps } from "components/base/SVG/SVG.props";

export interface SwipeableInteractionsProps {
  data: InteractionsProps[];
  swipeActionLabel: string;
  swipeActionIcon:  JSX.Element
  onSwipeTrigger: () => void;
}
