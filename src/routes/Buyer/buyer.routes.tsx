import React from 'react';

import DashboardLayout from 'components/layout/Dashboard';
import { BUYER_ROUTES, SELLER_ROUTES } from 'consts';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';

import Account from './Account';
import CategoriesLanding from './Categories/Landing';
import CategoriesPreview from './Categories/Preview';
import CategoriesSearch from './Categories/Search';
import Checkout from './Checkout';
import Home from './Home';
import Orders from './Orders';
import ProductDetails from './ProductDetails';
import Search from './Search';
import SellerDetails from './SellerDetails';

const ROUTES: Routes = {
  ACCOUNT: {
    path: '/buyer/account',
    children: <Account />,
    title: 'Account',
  },
  CATEGORIES: {
    path: BUYER_ROUTES.CATEGORIES,
    children: <CategoriesLanding />,
    title: 'Categories',
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
  CHECKOUT: {
    path: '/buyer/checkout',
    children: <Checkout />,
    title: 'Checkout',
  },
  HOME: {
    path: '/buyer/home',
    children: <Home />,
    title: 'Home',
  },
  ORDERS: {
    path: '/buyer/orders',
    children: <Orders />,
    title: 'Orders',
  },
  PRODUCT_DETAILS: {
    path: '/buyer/product/:id',
    children: <ProductDetails />,
    title: 'Product Details',
    hideFromSidebar: true,
  },
  SEARCH: {
    path: '/buyer/search', // use query params here
    children: <Search />,
    title: 'Search',
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
