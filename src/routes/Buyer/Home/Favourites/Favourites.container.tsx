import React, { useState, ChangeEvent } from 'react';

import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';

import FavouritesView from './Favourites.view';

const Favourites = (): JSX.Element => {
  const [searchValue, setSearchValue] = useState('');

  const addresses = useSelector(
    (state: Store) => state.getAddresses.data?.data.addresses
  );

  const isPendingAccount =
    addresses !== undefined &&
    !(addresses || []).some((a) => a.approved === 'APPROVED');

  const results = (
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.favouriteListing
    ) || []
  ).filter((result) => {
    return searchValue
      ? result.coop.name.toLowerCase().includes(searchValue.toLowerCase())
      : true;
  });

  const isLoadingResults =
    useSelector((state: Store) => state.getBuyerHomepage.pending) || false;

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const generatedProps = {
    results,
    isPendingAccount,
    onChangeSearchValue,
    searchValue,
    isLoadingResults,
  };

  return <FavouritesView {...generatedProps} />;
};

export default Favourites;
