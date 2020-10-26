import React from 'react';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Store } from 'types/store/Store';

import { CategoriesLandingGeneratedProps } from './Landing.props';
import CategoriesLandingView from './Landing.view';

const CategoriesLanding = (): JSX.Element => {
  // MARK:- States / Variables
  const location = useLocation();

  const categories =
    useSelector(
      (state: Store) => state.getBuyerHomepage.data?.data.data.categories
    ) || [];

  const generatedProps: CategoriesLandingGeneratedProps = {
    currentPath: location.pathname,
    categories,
  };

  return <CategoriesLandingView {...generatedProps} />;
};

export default CategoriesLanding;
