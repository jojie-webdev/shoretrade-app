import React from 'react';

import { SELLER_SOLD_ROUTES } from 'consts';
import { Route } from 'react-router-dom';

// Screens
import Details from './Details';
import Landing from './Sold.container';

const ROUTES = {
  LANDING: {
    path: SELLER_SOLD_ROUTES.LANDING,
    children: Landing,
  },
  DETAILS: {
    path: SELLER_SOLD_ROUTES.DETAILS,
    children: Details,
  },
};

const ROUTES_ARRAY = Object.values(ROUTES).map((value) => value);

const SellerAccountRoutes = (): JSX.Element => {
  return (
    <>
      {ROUTES_ARRAY.map((r) => (
        <Route key={r.path} path={`${r.path}`} exact component={r.children} />
      ))}
    </>
  );
};

export default SellerAccountRoutes;
