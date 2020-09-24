import React from 'react';

import {
  Search as SearchIcon,
  Account as AccountIcon,
  Home as HomeIcon,
  Category as CategoryIcon,
  Notepad as OrderIcon,
} from 'components/base/SVG';
import DashboardLayout from 'components/layout/Dashboard';
import { BUYER_ROUTES } from 'consts';
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';

import Account from './Account/accounts.routes';
import CategoriesLanding from './Categories/Landing';
import CategoriesPreview from './Categories/Preview';
import CategoriesSearch from './Categories/Search';
import Checkout from './Checkout';
import Home from './Home';
import Favourites from './Home/Favourites';
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
  FAVOURITES: {
    path: BUYER_ROUTES.FAVOURITES,
    children: <Favourites />,
    title: '',
    hideFromSidebar: true,
  },
  SEARCH: {
    path: '/buyer/search',
    children: <SearchLanding />,
    title: 'Search',
    icon: SearchIcon,
  },
  SEARCH_PREVIEW: {
    path: BUYER_ROUTES.SEARCH_PREVIEW(),
    children: <CategoriesPreview />,
    title: 'Search',
    hideFromSidebar: true,
  },
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
    nested: true,
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
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;
  const getBackAction = () => {
    if (
      (pathname.includes('/buyer/categories/') &&
        pathname.replace('/buyer/categories/', '').length > 0) ||
      pathname.includes('/buyer/favourites')
    ) {
      return history.goBack;
    }
    return undefined;
  };
  const fullWidthRoutes = ['/buyer/home'];
  if (pathname.includes('/buyer/product')) {
    fullWidthRoutes.push(pathname);
  }

  return (
    <DashboardLayout
      routes={ROUTES_ARRAY.filter((routes) => !routes.hideFromSidebar)}
      onBack={getBackAction()}
      shouldUseFullWidth={fullWidthRoutes.includes(pathname) ? true : false}
    >
      <Switch>
        {ROUTES_ARRAY.map((r) => (
          <Route key={`${r.path}`} path={`${r.path}`} exact={!r.nested}>
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
