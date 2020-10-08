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

import { SellerLandingGeneratedProps } from '../SellerLanding/SellerLanding.props';
import SellerLandingView from '../SellerLanding/SellerLanding.view';

const SellerFavouritesContainer = (): JSX.Element => {
  const dispatch = useDispatch();

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
