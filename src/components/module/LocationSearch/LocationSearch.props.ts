import { InteractionsProps } from 'components/base/Interactions/Interactions.props';
import { PlaceData } from 'types/PlaceData';

export interface LocationSearchProps {
  onSelect: (location?: PlaceData) => void;
  backgroundColor?: string;
  interactionProps?: Partial<InteractionsProps>;
  initialResult?: string[];
  autocompleteType?: string;
}
