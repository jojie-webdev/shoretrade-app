import React, { useState, useEffect } from 'react';

import { remove } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import {
  searchAndCountProductTypeActions,
  currentAddressActions,
  historyActions,
} from 'store/actions';
import { GetAddressOptions } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import { SearchLandingGeneratedProps } from './SearchLanding.props';
import SearchLandingView from './SearchLanding.view';

const SearchLanding = (): JSX.Element => {
  const dispatch = useDispatch();

  const addresses = GetAddressOptions();
  const selectedAddress =
    useSelector((state: Store) => state.currentAddress.id) || '';

  const selectAddress = (id: string) => {
    dispatch(
      currentAddressActions.update({
        id,
      })
    );
  };

  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const loading =
    useSelector((state: Store) => state.searchAndCountProductType.pending) ||
    false;
  const results =
    useSelector(
      (state: Store) => state.searchAndCountProductType.data?.data.types
    ) || [];

  const search = () => {
    // dispatch(
    //   searchAndCountProductTypeActions.request({
    //     term: searchTerm,
    //     address: '',
    //   })
    // );
  };

  const onReset = () => {
    setSearchTerm('');
  };

  const recent =
    useSelector((state: Store) => state.history.buyerRecentSearch) || [];

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

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }

    const timerId = setTimeout(() => {
      search();
    }, 800);

    setTimer(timerId);
  }, [searchTerm]);

  const generatedProps: SearchLandingGeneratedProps = {
    search,
    searchTerm,
    setSearchTerm,
    loading,
    results,
    onReset,
    recent,
    addresses,
    selectedAddress,
    selectAddress,
    saveSearchHistory,
  };
  return <SearchLandingView {...generatedProps} />;
};

export default SearchLanding;
