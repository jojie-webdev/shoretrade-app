import React, { useEffect, useState } from 'react';

import { remove } from 'ramda';
import reverse from 'ramda/es/reverse';
import { useDispatch, useSelector } from 'react-redux';
import {
  historyActions,
  searchAndCountProductTypeActions,
} from 'store/actions';
import { Store } from 'types/store/Store';

import { SearchLandingGeneratedProps } from './SearchLanding.props';
import SearchLandingView from './SearchLanding.view';

const SearchLanding = (): JSX.Element => {
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const recent =
    useSelector((state: Store) => state.history.buyerRecentSearch) || [];

  const results =
    useSelector(
      (state: Store) => state.searchAndCountProductType.data?.data.types
    ) || [];

  const data = searchTerm.length <= 2 ? reverse(recent) : results;

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

  useEffect(() => {
    if (searchTerm.length > 2) {
      if (timer) {
        clearTimeout(timer);
        setTimer(null);
      }

      const timerId = setTimeout(() => {
        dispatch(
          searchAndCountProductTypeActions.request({
            term: searchTerm,
            address: '',
          })
        );
      }, 500);

      setTimer(timerId);
    }
  }, [searchTerm]);

  const generatedProps: SearchLandingGeneratedProps = {
    data,
    isSearching,
    searchTerm,
    setSearchTerm,
    onReset,
    saveSearchHistory,
  };

  return <SearchLandingView {...generatedProps} />;
};

export default SearchLanding;
