import { InputHTMLAttributes } from 'react';

import { GetAddressesResponseItem } from 'types/store/GetAddressesState';
export type addressSelectionOption = {
  label: string;
  value: string;
};

export type searchInterface = {
  count: string;
  label: string;
  value: string;
};

export type changeAddress = {
  currentAddress: addressSelectionOption;
  newChangeAddress: string;
};

export interface SearchAddressProps {
  load: boolean;
  //#region Address
  addressModalChange: boolean;
  addressOptions: addressSelectionOption[];
  currentAddressSelected: addressSelectionOption;
  changeAddressModal: (value: boolean) => void;
  changeAddressFunc: (value: string) => void;
  changeAddress: {
    currentAddress: addressSelectionOption | undefined;
    newChangeAddress: string;
  };
  setDefaultAddress: () => void;
  confirmChangeAddress: () => void;
  //#endregion

  //#region Search
  onSearchChange: (value: string) => void;
  saveSearchHistory: (id: string, label: string, count: string) => void;

  searchTerm: string;
  onReset: () => void;
  data: searchInterface[];
  //#endregion
}
