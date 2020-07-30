import React from 'react';

import { Route, Switch } from 'react-router-dom';
import { Routes } from 'types/Routes';

import Login from './Auth/Login';
import Onboarding from './Auth/Onboarding';
import Register from './Auth/Register';
import BuyerRoutes from './Buyer/buyer.routes';
import SellerRoutes from './Seller/seller.routes';

export const ROUTES: Routes = {
  BUYER: {
    path: '/buyer',
    children: <BuyerRoutes />,
    nested: true,
  },
  ROOT: {
    path: '/',
    children: <h1>Landing Page if it exists</h1>,
  },
  LOGIN: {
    path: '/login',
    children: <Login />,
  },
  REGISTER: {
    path: '/register',
    children: <Register />,
  },
  ONBOARDING: {
    path: '/onboarding',
    children: <Onboarding />,
  },
  SELLER: {
    path: '/seller',
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
