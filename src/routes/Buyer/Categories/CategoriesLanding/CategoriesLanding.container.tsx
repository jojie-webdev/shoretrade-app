import React, { ChangeEvent, useEffect, useState } from 'react';

import { isEmpty } from 'ramda';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getSellerMarketPricesSearch } from 'services/company';
import { Store } from 'types/store/Store';

import CategoriesLandingView from './CategoriesLanding.view';

const CategoriesLanding = (): JSX.Element => {
  const location = useLocation();
  const token = useSelector((state: Store) => state.auth.token) || '';

  const generatedProps = {
    // generated props here
  };
  return <CategoriesLandingView {...generatedProps} />;
};

export default CategoriesLanding;
