import React, { ChangeEvent, useEffect, useState } from 'react';

import { isEmpty } from 'ramda';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getSellerMarketPricesSearch } from 'services/company';
import { Store } from 'types/store/Store';

import MarketPricesView from './MarketPrices.view';

const MarketPrices = (): JSX.Element => {
  const location = useLocation();
  const token = useSelector((state: Store) => state.auth.token) || '';

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const resetSearchValue = () => {
    setSearchValue('');
  };

  const search = async () => {
    setLoading(true);

    try {
      const res = await getSellerMarketPricesSearch(searchValue, token);
      setResults(res.data?.data?.data || []);
    } catch (e) {
      setResults([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    if (searchValue.length > 2) {
      const timerId = setTimeout(() => {
        search();
      }, 800);
      setTimer(timerId);
    } else if (searchValue.length <= 2 && isEmpty(results)) {
      search();
    }
  }, [searchValue.trim()]);

  useEffect(() => {
    console.log(results);
  }, [results]);

  const generatedProps = {
    onChangeSearchValue,
    searchValue,
    resetSearchValue,
    loading,
    results,
    currentPath: location.pathname,
  };
  return <MarketPricesView {...generatedProps} />;
};

export default MarketPrices;
