import React from 'react';

import { SELLER_DASHBOARD_ROUTES } from 'consts';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';

// Screens
import Landing from './Landing';

const ROUTES: Routes = {
  LANDING: {
    path: SELLER_DASHBOARD_ROUTES.LANDING,
    children: <Landing />,
  },
};

const ROUTES_ARRAY: TRoute[] = Object.values(ROUTES).map((value) => value);

const SellerAccountRoutes = (): JSX.Element => {
  return (
    <>
      {ROUTES_ARRAY.map((r) => (
        <Route key={r.path} path={`${r.path}`} exact>
          {r.children}
        </Route>
      ))}
      {/* <Route>
        <Redirect to="/seller/account" />
      </Route> */}
    </>
  );
};

export default SellerAccountRoutes;
