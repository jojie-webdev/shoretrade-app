import React from 'react';

import { MAIN_ROUTES, SELLER_ROUTES } from 'consts';
import { Route, Switch } from 'react-router-dom';
import { Routes } from 'types/Routes';

import Login from './Auth/Login';
import Onboarding from './Auth/Onboarding';
import Register from './Auth/Register';
import BuyerRoutes from './Buyer/buyer.routes';
import SellerRoutes from './Seller/seller.routes';

export const ROUTES: Routes = {
  // Main Routes
  ROOT: {
    path: MAIN_ROUTES.ROOT,
    children: <h1>Landing Page if it exists</h1>,
  },
  LOGIN: {
    path: MAIN_ROUTES.LOGIN,
    children: <Login />,
  },
  REGISTER: {
    path: MAIN_ROUTES.REGISTER,
    children: <Register />,
  },
  ONBOARDING: {
    path: MAIN_ROUTES.ONBOARDING,
    children: <Onboarding />,
  },

  // Nested Routes
  BUYER: {
    path: '/buyer',
    children: <BuyerRoutes />,
    nested: true,
  },
  SELLER: {
    path: SELLER_ROUTES.ROOT,
    children: <SellerRoutes />,
    nested: true,
  },
};

const RoutesComponent = (): JSX.Element => {
  return (
    <Switch>
      {Object.values(ROUTES).map((r) => (
        <Route key={r.path} path={r.path} exact={!r.nested}>
          {r.children}
        </Route>
      ))}
      <Route>
        <h1>404 route</h1>
      </Route>
    </Switch>
  );
};

export default RoutesComponent;
