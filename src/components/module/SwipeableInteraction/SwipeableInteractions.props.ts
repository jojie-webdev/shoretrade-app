import { InteractionsProps } from 'components/base/Interactions/Interactions.props';
import { SVGProps } from 'components/base/SVG/SVG.props';

export interface SwipeableInteractionProps extends InteractionsProps {
  id: string;
}

export interface SwipeableInteractionsProps {
  data: SwipeableInteractionProps[];
  swipeActionLabel: string;
  swipeActionIcon: JSX.Element;
  onSwipeTrigger: (id: string) => void;
}
