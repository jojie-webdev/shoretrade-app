import React from 'react';

import { SELLING_ROUTES } from 'consts';
import { Route, Switch, Redirect } from 'react-router-dom';

// Screens
import ListingDetails from './ListingDetails';
import Selling from './Selling.container';

const ROUTES = {
  LANDING: {
    path: SELLING_ROUTES.LANDING,
    children: Selling,
  },
  LISTING_DETAILS: {
    path: SELLING_ROUTES.LISTING_DETAILS,
    children: ListingDetails,
  },
};

const ROUTES_ARRAY = Object.values(ROUTES).map((value) => value);

const SellingRoutes = (): JSX.Element => {
  return (
    <>
      {ROUTES_ARRAY.map((r) => (
        <Route key={r.path} path={`${r.path}`} exact component={r.children} />
      ))}
    </>
  );
};

export default SellingRoutes;
