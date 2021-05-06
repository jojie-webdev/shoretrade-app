import React, { ChangeEvent, useState } from 'react';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Store } from 'types/store/Store';

import { CategoriesLandingGeneratedProps } from './Landing.props';
import CategoriesLandingView from './Landing.view';

const CategoriesLanding = (): JSX.Element => {
  const location = useLocation();

  const [search, setSearch] = useState('');

  const categories = (
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.categories
    ) || []
  ).filter((c) =>
    search ? c.name.toLowerCase().includes(search.toLowerCase()) : true
  );

  const onChangeSearchValue = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const generatedProps: CategoriesLandingGeneratedProps = {
    currentPath: location.pathname,
    categories,
    search,
    onChangeSearchValue,
  };

  return <CategoriesLandingView {...generatedProps} />;
};

export default CategoriesLanding;
