import React from 'react';

import { SELLER_DASHBOARD_ROUTES } from 'consts';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';

// Screens
import CashFlow from './CashFlow';
import Categories from './Categories';
import CategoryDetail from './CategoryDetail';
import Landing from './Landing';

const ROUTES: Routes = {
  LANDING: {
    path: SELLER_DASHBOARD_ROUTES.LANDING,
    children: <Landing />,
  },
  CASH_FLOW: {
    path: SELLER_DASHBOARD_ROUTES.CASH_FLOW(),
    children: <CashFlow />,
  },
  CATEGORIES: {
    path: SELLER_DASHBOARD_ROUTES.CATEGORIES(),
    children: <Categories />,
  },
  CATEGORY_DETAIL: {
    path: SELLER_DASHBOARD_ROUTES.CATEGORY_DETAIL(),
    children: <CategoryDetail />,
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
      <Route>
        <Redirect to="/seller/dashboard" />
      </Route>
    </>
  );
};

export default SellerAccountRoutes;
