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
  //#region Address
  addressOptions: addressSelectionOption[];
  currentAddressSelected: addressSelectionOption;
  changeAddressModal: (value: boolean) => void;
  changeAddressFunc: (value: changeAddress) => void;
  changeAddress: {
    currentAddress: addressSelectionOption | undefined;
    newChangeAddress: string;
  };
  searchTerm: string;
  onReset: () => void;
  //#endregion

  //#region Search
  //#endregion
}
