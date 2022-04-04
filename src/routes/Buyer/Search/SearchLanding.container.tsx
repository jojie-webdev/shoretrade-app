import React, { useEffect, useState } from 'react';

import { remove } from 'ramda';
import reverse from 'ramda/es/reverse';
import { useDispatch, useSelector } from 'react-redux';
import { SearchLandingGeneratedProps } from 'routes/Buyer/Search/SearchLanding.props';
import SearchLandingView from 'routes/Buyer/Search/SearchLanding.view';
import {
  historyActions,
  searchAndCountProductTypeActions,
} from 'store/actions';
import { Store } from 'types/store/Store';

const SearchLanding = (): JSX.Element => {
  const dispatch = useDispatch();

  const [isTyping, setIsTyping] = useState<boolean>(false);
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

  const addresses =
    useSelector((state: Store) => state.getAddresses.data?.data.addresses) ||
    [];

  const currentDefaultAddressId = (
    addresses.find((i) => i.default) || { id: '' }
  ).id;

  const onReset = () => {
    setSearchTerm('');
  };

  const handleSearchTerm = (term: string) => {
    setSearchTerm(term);
    setIsTyping(true);
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
    const timer = setTimeout(() => {
      if (isTyping) setIsTyping(false);
    }, 750);

    return () => clearTimeout(timer);
  }, [isTyping, searchTerm]);

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
            address: currentDefaultAddressId,
          })
        );
      }, 500);

      setTimer(timerId);
    }
    // eslint-disable-next-line
  }, [searchTerm]);

  const generatedProps: SearchLandingGeneratedProps = {
    data,
    isSearching,
    searchTerm,
    setSearchTerm: handleSearchTerm,
    onReset,
    saveSearchHistory,
    isTyping,
  };

  return <SearchLandingView {...generatedProps} />;
};

export default SearchLanding;
