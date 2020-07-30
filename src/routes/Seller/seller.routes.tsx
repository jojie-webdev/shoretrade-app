import React from 'react';

import DashboardLayout from 'components/layout/Dashboard';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';

import Account from './Account';
import AddProduct from './AddProduct';
import Dashboard from './Dashboard';
import MarketPrices from './MarketPrices';
import Selling from './Selling';
import Sold from './Sold';

const ROUTES: Routes = {
  ACCOUNT: {
    path: '/seller/account',
    children: <Account />,
    title: 'Account',
  },
  ADD_PRODUCT: {
    path: '/seller/add-product',
    children: <AddProduct />,
    title: 'Add Product',
  },
  DASHBOARD: {
    path: '/seller/dashboard',
    children: <Dashboard />,
    title: 'Dashboard',
  },
  MARKET_PRICES: {
    path: '/seller/market-prices',
    children: <MarketPrices />,
    title: 'Market Prices',
  },
  SELLING: {
    path: '/seller/selling',
    children: <Selling />,
    title: 'Selling',
  },
  SOLD: {
    path: '/seller/sold',
    children: <Sold />,
    title: 'Sold',
  },
};

const ROUTES_ARRAY: TRoute[] = Object.values(ROUTES).map((value) => value);

const SellerRoutes = (): JSX.Element => {
  return (
    <DashboardLayout
      routes={ROUTES_ARRAY.filter((routes) => !routes.hideFromSidebar)}
    >
      <Switch>
        {ROUTES_ARRAY.map((r) => (
          <Route key={r.path} path={`${r.path}`} exact>
            {r.children}
          </Route>
        ))}
        <Route>
          <Redirect to="/seller/dashboard" />
        </Route>
      </Switch>
    </DashboardLayout>
  );
};

export default SellerRoutes;
