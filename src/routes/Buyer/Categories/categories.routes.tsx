import React from 'react';

import { BUYER_CATEGORIES_ROUTES } from 'consts';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';

import CategoriesLanding from './CategoriesLanding';
import CategoriesPreview from './CategoriesPreview';
import CategoriesSearch from './CategoriesSearch';

const ROUTES: Routes = {
  LANDING: {
    path: BUYER_CATEGORIES_ROUTES.LANDING,
    children: <CategoriesLanding />,
  },
  CASH_FLOW: {
    path: BUYER_CATEGORIES_ROUTES.PRODUCTS,
    children: <CategoriesSearch />,
  },
  CATEGORIES: {
    path: BUYER_CATEGORIES_ROUTES.PRODUCTS_PREVIEW,
    children: <CategoriesPreview />,
  },
};

const ROUTES_ARRAY: TRoute[] = Object.values(ROUTES).map((value) => value);

const BuyerCategoriesRoutes = (): JSX.Element => {
  return (
    <>
      {ROUTES_ARRAY.map((r) => (
        <Route key={r.path} path={`${r.path}`} exact>
          {r.children}
        </Route>
      ))}
      <Route>
        <Redirect to="/buyer/categories" />
      </Route>
    </>
  );
};

export default BuyerCategoriesRoutes;
