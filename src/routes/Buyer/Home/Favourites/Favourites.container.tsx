import React, { useState, ChangeEvent } from 'react';

import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';

import FavouritesView from './Favourites.view';

const Favourites = (): JSX.Element => {
  const [search, setSearch] = useState('');

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
  ).filter((result) =>
    search ? result.type.toLowerCase().includes(search.toLowerCase()) : true
  );

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const resetSearchValue = () => {
    setSearch('');
  };

  const generatedProps = {
    results,
    isPendingAccount,
    onChangeSearchValue,
    search,
    resetSearchValue,
  };

  return <FavouritesView {...generatedProps} />;
};

export default Favourites;
