import React, { ChangeEvent, useState } from 'react';

import { useLocation } from 'react-router-dom';

import MarketPricesView from './MarketPrices.view';

const MarketPrices = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState('');
  const location = useLocation();

  function onChangeSearchValue(event: ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
  }

  function resetSearchValue() {
    setSearchValue('');
  }

  const generatedProps = {
    onChangeSearchValue,
    searchValue,
    resetSearchValue,
    currentPath: location.pathname,
  };
  return <MarketPricesView {...generatedProps} />;
};

export default MarketPrices;
