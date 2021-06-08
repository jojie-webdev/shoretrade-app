import { Dispatch, SetStateAction } from 'react';

import { ModalProps } from 'components/layout/Modal/Modal.props';

export type FilterType = 'location' | 'choice' | 'size_dropdown' | 'size_input' | 'multiple';

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

export interface MarketRequestOfferFilterModalProps extends ModalProps {
  onReset: () => void;
  filters: Filters[];
  checkboxFilters?: CheckboxFilter[];
  selectedFilters: string[];
  setSelectedFilters: Dispatch<SetStateAction<string[]>>;
  selectedCheckboxFilters?: string[];
  setSelectedCheckboxFilters?: Dispatch<SetStateAction<string[]>>;
  onApply: () => void;
}
