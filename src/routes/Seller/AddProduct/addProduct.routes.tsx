import React from 'react';

import { ADD_PRODUCT_ROUTES, SELLING_ROUTES } from 'consts';
import { Route, Switch, Redirect } from 'react-router-dom';

// Screens
import AddProduct from './AddProduct.container';
import Preview from './Preview/Preview.container';

const ROUTES = {
  LANDING: {
    path: ADD_PRODUCT_ROUTES.LANDING,
    children: AddProduct,
  },
  PREVIEW: {
    path: ADD_PRODUCT_ROUTES.PREVIEW,
    children: Preview,
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
