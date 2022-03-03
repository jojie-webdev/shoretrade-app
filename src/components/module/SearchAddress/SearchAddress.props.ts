import { Dispatch } from 'react';

import { OptionsType } from 'components/base/Select/Select.props';
import { UserSearchPreferences } from 'types/store/GetUserState';
import { UpdatePreferencesMeta } from 'types/store/UpdatePreferencesState';

export type SearchInterface = {
  count: string;
  label: string;
  value: string;
};

export interface SearchAddressProps {
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

  buyingStates: OptionsType[];
  listingMetrics: OptionsType[];
  minBuyingQuantity: number;
  searchPreferences: UserSearchPreferences;
  updatePreferences: (v: UpdatePreferencesMeta) => void;
}
