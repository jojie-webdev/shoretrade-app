import { Dispatch } from 'react';

export type SearchInterface = {
  count: string;
  label: string;
  value: string;
};

export interface SearchAddressProps {
  includeSellerSearch?: boolean;
}

export interface SearchAddressGeneratedProps {
  //#region Address
  addressOptions: { label: string; value: string }[];
  currentDefaultAddressId: string;
  targetAddress: string;
  setTargetAddress: Dispatch<string>;
  setDefaultAddress: (addressId: string) => void;
  //#endregion

  //#region Search
  saveSearchHistory: (id: string, label: string, count: string) => void;
  isSearching: boolean;
  searchTerm: string;
  setSearchTerm: Dispatch<string>;
  onReset: () => void;
  data: SearchInterface[];
  shouldHideResult: boolean;
  //#endregion
}
