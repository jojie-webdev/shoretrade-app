import { ModalProps } from 'components/layout/Modal/Modal.props';
import { LocationSearchProps } from 'components/module/LocationSearch/LocationSearch.props';
import { PlaceData } from 'types/PlaceData';

export interface DropdownLocationProps {
  value: string;
  onSelect: (location: PlaceData) => void;
  label?: string;
  error?: string;
  locationSearchProps?: Partial<LocationSearchProps>;
  modalProps?: ModalProps;
  className?: string;
}
