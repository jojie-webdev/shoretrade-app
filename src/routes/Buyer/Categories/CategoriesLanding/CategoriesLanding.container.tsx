import React, { ChangeEvent, useEffect, useState } from 'react';

import { isEmpty } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getBuyerHomepage } from 'services/company';
import { currentAddressActions, getBuyerHomepageActions } from 'store/actions';
import { GetAddressOptions } from 'store/selectors/buyer';
import useSelectorSafe from 'store/selectors/useSelectorSafe';
import { Store } from 'types/store/Store';

import CategoriesLandingView from './CategoriesLanding.view';

const CategoriesLanding = (): JSX.Element => {
  const [search, setSearch] = useState('');
  const location = useLocation();
  const dispatch = useDispatch();
  const addresses = GetAddressOptions();
  const selectedAddress =
    useSelectorSafe((state) => state.currentAddress.id) || '';
  const selectAddress = (id: string) => {
    dispatch(
      currentAddressActions.update({
        id,
      })
    );
  };

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const resetSearchValue = () => {
    setSearch('');
  };

  const categories = (
    useSelectorSafe(
      (state) => state.getBuyerHomepage.data?.data.data.categories
    ) || []
  ).filter((category) =>
    search ? category.name.toLowerCase().includes(search.toLowerCase()) : true
  );
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
