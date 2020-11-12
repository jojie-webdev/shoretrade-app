import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getListingTypesByCategoryActions } from 'store/actions';
import { Store } from 'types/store/Store';

import { CategoriesSearchGeneratedProps } from './Search.props';
import CategoriesSearchView from './Search.view';
const CategoriesSearch = (): JSX.Element => {
  // MARK:- States / Variables
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const previousId =
    useSelector(
      (state: Store) => state.getListingTypesByCategory.request?.categoryId
    ) || '';
  const results =
    useSelector(
      (state: Store) => state.getListingTypesByCategory.data?.data.type
    ) || [];

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

  // MARK:- Render
  const generatedProps: CategoriesSearchGeneratedProps = {
    loading,
    results,
    categoryId: id,
    onLoad,
  };
  return <CategoriesSearchView {...generatedProps} />;
};

export default CategoriesSearch;
