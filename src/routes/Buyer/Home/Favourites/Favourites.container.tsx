import React, { useState, ChangeEvent, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import {
  getBuyerSearchFilterDataActions,
  getListingsByTypeActions,
  currentAddressActions,
} from 'store/actions';
import { GetAddressOptions } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import { FavouritesGeneratedProps } from './Favourites.props';
import FavouritesView from './Favourites.view';

const Favourites = (): JSX.Element => {
  const dispatch = useDispatch();

  const [search, setSearch] = useState('');

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
    onChangeSearchValue,
    search,
    resetSearchValue,
  };

  return <FavouritesView {...generatedProps} />;
};

export default Favourites;
