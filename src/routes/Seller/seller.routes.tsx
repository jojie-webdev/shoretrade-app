import React from 'react';

import {
  Dashboard as DashboardSVG,
  AddBorder,
  Account as AccountSVG,
  FileCheck,
  Cart,
  CheckBorder,
} from 'components/base/SVG';
import DashboardLayout from 'components/layout/Dashboard';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';

// Screens
import SellerAccountRoutes from './Account/account.routes';
import Account from './Account/Landing';
import AddProduct from './AddProduct';
import Dashboard from './Dashboard';
import MarketPriceDetail from './MarketPriceDetail';
import MarketPrices from './MarketPrices';
import Selling from './Selling';
import Sold from './Sold';

const ROUTES: Routes = {
  DASHBOARD: {
    path: '/seller/dashboard',
    title: 'Dashboard',
    children: <Dashboard />,
    icon: DashboardSVG,
  },
  // Market Prices
  MARKET_PRICES: {
    path: '/seller/market-prices',
    title: 'Market Prices',
    children: <MarketPrices />,
    icon: FileCheck,
  },
  MARKET_PRICE_DETAIL: {
    path: '/seller/market-prices/:id',
    title: '',
    children: <MarketPriceDetail />,
    hideFromSidebar: true,
  },

  // Add Product
  ADD_PRODUCT: {
    path: '/seller/add-product',
    title: 'Add Product',
    children: <AddProduct />,
    icon: AddBorder,
  },
  SELLING: {
    path: '/seller/selling',
    title: 'Selling',
    children: <Selling />,
    icon: Cart,
  },
  SOLD: {
    path: '/seller/sold',
    title: 'Sold',
    children: <Sold />,
    icon: CheckBorder,
  },
  ACCOUNT: {
    path: '/seller/account',
    title: 'Account',
    children: <SellerAccountRoutes />,
    icon: AccountSVG,
    nested: true,
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
          <Route key={r.path} path={`${r.path}`} exact={!r.nested}>
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
