import React, { useState, ChangeEvent } from 'react';

import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';

import SellerLandingView from '../SellerLanding/SellerLanding.view';

const SellerFavouritesContainer = (): JSX.Element => {
  const [search, setSearch] = useState('');

  const results = (
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.favouriteSellers
    ) || []
  ).filter((result) =>
    search
      ? result.companyName.toLowerCase().includes(search.toLowerCase())
      : true
  );

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const resetSearchValue = () => {
    setSearch('');
  };

  const generatedProps = {
    results,
    onChangeSearchValue,
    search,
    resetSearchValue,
  };

  return <SellerLandingView {...generatedProps} />;
};

export default SellerFavouritesContainer;
