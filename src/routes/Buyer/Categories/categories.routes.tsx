import React from 'react';

import { Category as CategoryIcon } from 'components/base/SVG';
import { BUYER_ROUTES } from 'consts';
import { Route, Switch } from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';

import CategoriesLanding from './Landing';
import CategoriesPreview from './Preview';
import CategoriesSearch from './Search';

const ROUTES: Routes = {
  CATEGORIES: {
    path: BUYER_ROUTES.CATEGORIES,
    children: <CategoriesLanding />,
    title: 'Categories',
    icon: CategoryIcon,
  },
  CATEGORY_PRODUCTS: {
    path: BUYER_ROUTES.CATEGORY_PRODUCTS(),
    children: <CategoriesSearch />,
    title: '',
    hideFromSidebar: true,
  },
  PRODUCT_PREVIEW: {
    path: BUYER_ROUTES.PRODUCT_PREVIEW(),
    children: <CategoriesPreview />,
    title: '',
    hideFromSidebar: true,
  },
};

const ROUTES_ARRAY: TRoute[] = Object.values(ROUTES).map((value) => value);

const CategoriesRoute = (): JSX.Element => {
  return (
    <>
      <Switch>
        {ROUTES_ARRAY.map((r) => (
          <Route key={r.path} path={`${r.path}`} exact>
            {r.children}
          </Route>
        ))}
      </Switch>
    </>
  );
};

export default CategoriesRoute;
