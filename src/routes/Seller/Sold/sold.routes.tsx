import React from 'react';

import { SELLER_SOLD_ROUTES } from 'consts';
import { Route, Switch, Redirect } from 'react-router-dom';

// Screens
import ConfirmList from './ConfirmList';
import Landing from './Sold.container';

const ROUTES = {
  LANDING: {
    path: SELLER_SOLD_ROUTES.LANDING,
    children: Landing,
  },
  CONFIRM_LIST: {
    path: SELLER_SOLD_ROUTES.CONFIRM_LIST,
    children: ConfirmList,
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
