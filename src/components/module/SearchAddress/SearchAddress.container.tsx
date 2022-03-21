import React, { useState, useEffect } from 'react';

import { OptionsType } from 'components/base/Select/Select.props';
import {
  addressToPlaceData,
  placeDataToUpdateAddressMeta,
} from 'components/module/SearchAddress/SearchAddress.transform';
import { remove } from 'ramda';
import reverse from 'ramda/es/reverse';
import { useSelector, useDispatch } from 'react-redux';
import {
  updateAddressActions,
  searchAndCountProductTypeActions,
  historyActions,
  getBuyerSearchFiltersActions,
  updatePreferencesActions,
} from 'store/actions';
import { GetAddressOptions, GetDefaultCompany } from 'store/selectors/buyer';
import { UserSearchPreferences } from 'types/store/GetUserState';
import { Store } from 'types/store/Store';
import { UpdatePreferencesMeta } from 'types/store/UpdatePreferencesState';

import SearchAddressView from './SearchAddress.view';

const SearchAddress = (): JSX.Element => {
  const dispatch = useDispatch();
  const [hasInitPreferences, setHasInitPreferences] = useState(false);
  //#region Address

  useEffect(() => {
    dispatch(getBuyerSearchFiltersActions.request({}));
    // eslint-disable-next-line
  }, []);

  const searchPreferences = useSelector(
    (state: Store) =>
      state.getUser.data?.data?.user.preferences?.searchPreferences || {}
  );

  const loadingUser = useSelector((state: Store) => state.getUser.pending);

  const buyerSearchFilters = useSelector(
    (state: Store) => state.getBuyerSearchFilters.data?.data.filters
  );

  const loadingUpdatePref = useSelector(
    (state: Store) => state.updatePreferences.pending
  );

  const companyId = GetDefaultCompany()?.id || '';

  const addresses =
    useSelector((state: Store) => state.getAddresses.data?.data.addresses) ||
    [];
  const addressOptions = GetAddressOptions();
  const currentDefaultAddressId = (
    addresses.find((i) => i.default) || { id: '' }
  ).id;

  const [targetAddress, setTargetAddress] = useState('');

  const setDefaultAddress = (addressId: string) => {
    const targetAddressData = addresses.find((i) => i.id === addressId);
    if (targetAddressData) {
      dispatch(
        updateAddressActions.request(
          placeDataToUpdateAddressMeta(
            addressToPlaceData(targetAddressData),
            targetAddressData.unitNumber,
            companyId,
            true,
            targetAddressData.id
          )
        )
      );
    }
  };

  useEffect(() => {
    if (currentDefaultAddressId.length > 0 && targetAddress.length > 0) {
      setTargetAddress('');
    }

    if (
      currentDefaultAddressId.length > 0 &&
      addressOptions.length > 0 &&
      !addressOptions.map((a) => a.value).includes(currentDefaultAddressId)
    ) {
      setDefaultAddress(addressOptions[0].value);
    }
    // eslint-disable-next-line
  }, [currentDefaultAddressId]);
  //#endregion

  //#region Search
  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [shouldHideResult, setShouldHideResult] = useState(false);
  const recent =
    useSelector((state: Store) => state.history.buyerRecentSearch) || [];

  const results =
    useSelector(
      (state: Store) => state.searchAndCountProductType.data?.data.types
    ) || [];

  const data = searchTerm.length === 0 ? reverse(recent) : results;

  const isSearching =
    useSelector((state: Store) => state.searchAndCountProductType.pending) ||
    false;

  const onReset = () => {
    setSearchTerm('');
  };

  const saveSearchHistory = (id: string, label: string, count: string) => {
    const historyLimit = 20;
    const isExisting = recent.findIndex((r) => r.value === id) !== -1;
    if (!isExisting) {
      dispatch(
        historyActions.update({
          buyerRecentSearch: [
            ...(recent.length === historyLimit ? remove(0, 1, recent) : recent),
            {
              value: id,
              label,
              count,
            },
          ],
        })
      );
    }
  };

  const updatePreferences = (data: UpdatePreferencesMeta) => {
    const { states, metric, weight } = data.search || {};
    if (states && weight !== undefined) {
      data.search.metric = metric === 'ALL' ? null : metric;
      dispatch(updatePreferencesActions.request(data));
    }
  };

  useEffect(() => {
    if (
      !loadingUser &&
      Object.keys(searchPreferences).length === 0 &&
      Object.keys(buyerSearchFilters || {}).length > 0
    ) {
      updatePreferences({
        search: {
          states: buyerSearchFilters?.states,
          weight: Number(buyerSearchFilters?.minimum_order || '0'),
        },
      });
      setHasInitPreferences(true);
    }
  }, [searchPreferences, buyerSearchFilters]);

  useEffect(() => {
    if (searchTerm.length > 2) {
      if (!shouldHideResult) {
        setShouldHideResult(true);
      }

      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }

      const timerId = setTimeout(() => {
        setShouldHideResult(false);
        dispatch(
          searchAndCountProductTypeActions.request({
            term: searchTerm,
            address: '',
          })
        );
      }, 200);

      setTimer(timerId);
    }
    // eslint-disable-next-line
  }, [searchTerm]);
  //#endregion

  const generatedProps = {
    //#region Address
    addressOptions,
    currentDefaultAddressId,
    targetAddress,
    setTargetAddress,
    setDefaultAddress,
    //#endregion
    //#region Search
    isSearching,
    setSearchTerm,
    saveSearchHistory,
    searchTerm,
    onReset,
    data,
    shouldHideResult,
    //#endregion

    buyingStates: (buyerSearchFilters?.states || []).map((v) => ({
      label: v,
      value: v,
    })),
    listingMetrics: (buyerSearchFilters?.metric || []).map((v) =>
      v === null
        ? { label: 'ALL', value: 'ALL' }
        : {
            label: v,
            value: v,
          }
    ),
    minBuyingQuantity: Number(buyerSearchFilters?.minimum_order || '0'),
    searchPreferences,
    updatePreferences,
    initialisedPreferences:
      loadingUpdatePref === false &&
      Object.keys(searchPreferences).length > 0 &&
      hasInitPreferences,
  };

  if (loadingUser) return <></>;

  return <SearchAddressView {...generatedProps} />;
};

export default SearchAddress;
