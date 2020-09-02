import React, { ChangeEvent, useEffect, useState } from 'react';

import { isEmpty } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  getListingTypesByCategoryActions,
  currentAddressActions,
} from 'store/actions';
import { GetAddressOptions } from 'store/selectors/buyer';
import { Store } from 'types/store/Store';

import CategoriesSearchView from './Search.view';

const CategoriesSearch = (): JSX.Element => {
  // MARK:- States / Variables
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const id = location.pathname.replace('/buyer/categories/', '');

  const token = useSelector((state: Store) => state.auth.token) || '';
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

  const previousId =
    useSelector(
      (state: Store) => state.getListingTypesByCategory.request?.categoryId
    ) || '';
  const results = (
    useSelector(
      (state: Store) => state.getListingTypesByCategory.data?.data.type
    ) || []
  ).filter((result) =>
    searchValue
      ? result.name.toLowerCase().includes(searchValue.toLowerCase())
      : true
  );

  // MARK:- Effects
  useEffect(() => {
    if (id && previousId !== id) {
      onLoad(id);
    }
  }, [id]);

  // MARK:- Methods
  const onLoad = (categoryId: string) => {
    setLoading(true);
    dispatch(
      getListingTypesByCategoryActions.request({ categoryId: categoryId })
    );
    setLoading(false);
  };

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const resetSearchValue = () => {
    setSearchValue('');
  };

  // MARK:- Render
  const generatedProps = {
    // generated props hereonChangeSearchValue,
    onChangeSearchValue,
    searchValue,
    resetSearchValue,
    loading,
    results,
    categoryId: id,
    onLoad,
    addresses,
    selectedAddress,
    selectAddress,
  };
  return <CategoriesSearchView {...generatedProps} />;
};

export default CategoriesSearch;
