import { Dispatch, SetStateAction } from 'react';
import { PlaceData } from '../../../types/PlaceData';
import { ModalProps } from 'components/layout/Modal/Modal.props';

export type FilterType = 'location' |'choice' | 'size_dropdown' | 'size_input';

export interface Filters {
  label: string;
  values?: string[];
  type: FilterType;
  sizeDropdownValues?: {
    from: { label: string; value: string }[];
    to: { label: string; value: string }[];
  };
  unit?: string;
}

export interface CheckboxFilter {
  label: string;
  value: string;
}

export interface FilterModalProps extends ModalProps {
  onReset: () => void;
  filters: Filters[];
  checkboxFilters?: CheckboxFilter[];
  selectedFilters: string[];
  setSelectedFilters: Dispatch<SetStateAction<string[]>>;
  selectedCheckboxFilters?: string[];
  setSelectedCheckboxFilters?: Dispatch<SetStateAction<string[]>>;
  selectedLocation?: PlaceData | null;
  setSelectedLocation?: Dispatch<SetStateAction<PlaceData | null>>;
  selectedSize?: string | null;
  setSelectedSize?: Dispatch<SetStateAction<string | null>>;
  onApply: () => void;
}
