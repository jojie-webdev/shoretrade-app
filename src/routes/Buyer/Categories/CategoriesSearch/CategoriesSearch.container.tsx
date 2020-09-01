import React, { ChangeEvent, useEffect, useState } from 'react';

import { isEmpty } from 'ramda';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getSellerMarketPricesSearch } from 'services/company';
import { getListingTypesByCategoryActions } from 'store/actions';
import useSelectorSafe from 'store/selectors/useSelectorSafe';
import { Store } from 'types/store/Store';

import CategoriesSearchView from './CategoriesSearch.view';

const CategoriesSearch = (): JSX.Element => {
  const location = useLocation();
  const token = useSelector((state: Store) => state.auth.token) || '';
  const dispatch = useDispatch();

  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  const id = location.pathname.replace('/buyer/categories/', '');
  const previousId =
    useSelectorSafe(
      (state) => state.getListingTypesByCategory.request?.categoryId
    ) || '';

  const results = (
    useSelectorSafe(
      (state) => state.getListingTypesByCategory.data?.data.type
    ) || []
  ).filter((result) =>
    searchValue
      ? result.name.toLowerCase().includes(searchValue.toLowerCase())
      : true
  );

  const onLoad = (categoryId: string) => {
    dispatch(
      getListingTypesByCategoryActions.request({ categoryId: categoryId })
    );
  };

  useEffect(() => {
    if (id && previousId !== id) {
      onLoad(id);
    }
  }, [id]);

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const resetSearchValue = () => {
    setSearchValue('');
  };

  const generatedProps = {
    // generated props hereonChangeSearchValue,
    onChangeSearchValue,
    searchValue,
    resetSearchValue,
    loading,
    results,
    categoryId: id,
    onLoad,
  };
  return <CategoriesSearchView {...generatedProps} />;
};

export default CategoriesSearch;
