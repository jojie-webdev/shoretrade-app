import React, { ChangeEvent, useEffect, useState } from 'react';

import { isEmpty } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { currentAddressActions } from 'store/actions';
import { GetAddressOptions } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import CategoriesLandingView from './Landing.view';

const CategoriesLanding = (): JSX.Element => {
  // MARK:- States / Variables
  const [search, setSearch] = useState('');
  const location = useLocation();
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

  const categories = (
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.categories
    ) || []
  ).filter((category) =>
    search ? category.name.toLowerCase().includes(search.toLowerCase()) : true
  );

  // MARK:- Methods
  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const resetSearchValue = () => {
    setSearch('');
  };
  console.log(categories);
  const generatedProps = {
    // generated props here
    categories,
    search,
    onChangeSearchValue,
    resetSearchValue,
    currentPath: location.pathname,
  };
  return <CategoriesLandingView {...generatedProps} />;
};

export default CategoriesLanding;
