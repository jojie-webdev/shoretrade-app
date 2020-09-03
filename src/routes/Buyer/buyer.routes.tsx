import React from 'react';

import {
  Search as SearchIcon,
  Account as AccountIcon,
  Home as HomeIcon,
  Category as CategoryIcon,
  Notepad as OrderIcon,
} from 'components/base/SVG';
import DashboardLayout from 'components/layout/Dashboard';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';

import Account from './Account';
import Categories from './Categories';
import Checkout from './Checkout';
import Home from './Home';
import Orders from './Orders';
import ProductDetails from './ProductDetails';
import { SearchLanding } from './Search';
import SellerDetails from './SellerDetails';

const ROUTES: Routes = {
  HOME: {
    path: '/buyer/home',
    children: <Home />,
    title: 'Home',
    icon: HomeIcon,
  },
  SEARCH: {
    path: '/buyer/search', // use query params here
    children: <SearchLanding />,
    title: 'Search',
    icon: SearchIcon,
  },
  CATEGORIES: {
    path: '/buyer/categories',
    children: <Categories />,
    title: 'Categories',
    icon: CategoryIcon,
  },
  ORDERS: {
    path: '/buyer/orders',
    children: <Orders />,
    title: 'Orders',
    icon: OrderIcon,
  },
  ACCOUNT: {
    path: '/buyer/account',
    children: <Account />,
    title: 'Account',
    icon: AccountIcon,
  },
  CHECKOUT: {
    path: '/buyer/checkout',
    children: <Checkout />,
    title: 'Checkout',
    hideFromSidebar: true,
  },
  PRODUCT_DETAILS: {
    path: '/buyer/product/:id',
    children: <ProductDetails />,
    title: 'Product Details',
    hideFromSidebar: true,
  },
  SELLER_DETAILS: {
    path: '/buyer/seller-details/:id',
    children: <SellerDetails />,
    title: 'Seller Details',
    hideFromSidebar: true,
  },
};

const ROUTES_ARRAY: TRoute[] = Object.values(ROUTES).map((value) => value);

const BuyerRoutes = (): JSX.Element => {
  return (
    <DashboardLayout
      routes={ROUTES_ARRAY.filter((routes) => !routes.hideFromSidebar)}
    >
      <Switch>
        {ROUTES_ARRAY.map((r) => (
          <Route key={`${r.path}`} path={`${r.path}`} exact>
            {r.children}
          </Route>
        ))}
        <Route>
          <Redirect to="/buyer/home"></Redirect>
        </Route>
      </Switch>
    </DashboardLayout>
  );
};

export default BuyerRoutes;
