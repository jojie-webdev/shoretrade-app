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
import { Theme } from 'types/Theme';

import Account from './Account/accounts.routes';
import Categories from './Categories/categories.routes';
import CategoriesLanding from './Categories/Landing';
import CategoriesPreview from './Categories/Preview';
import CategoriesSearch from './Categories/Search';
import Checkout from './Checkout';
import Home from './Home';
import Favourites from './Home/Favourites';
import RecentlyAdded from './Home/RecentlyAdded';
import SellerFavouritesContainer from './Home/SellerFavourites/SellerFavourites.container';
import SellerLanding from './Home/SellerLanding';
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
    title: 'Favourites',
    hideFromSidebar: true,
  },
  FAVOURITE_SELLERS: {
    path: BUYER_ROUTES.FAVOURITE_SELLERS,
    children: <SellerFavouritesContainer />,
    title: 'Favourite Sellers',
    hideFromSidebar: true,
  },
  RECENTLY_ADDED: {
    path: BUYER_ROUTES.RECENTLY_ADDED,
    children: <RecentlyAdded />,
    title: 'Recently Added',
    hideFromSidebar: true,
  },
  SEARCH: {
    path: BUYER_ROUTES.SEARCH,
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
    path: '/buyer/categories',
    children: <Categories />,
    title: 'Categories',
    icon: CategoryIcon,
    nested: true,
  },
  ORDERS: {
    path: BUYER_ROUTES.ORDERS,
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
  SELLERS: {
    path: BUYER_ROUTES.SELLERS,
    children: <SellerLanding />,
    title: 'Sellers',
    hideFromSidebar: true,
  },
};

const ROUTES_ARRAY: TRoute[] = Object.values(ROUTES).map((value) => value);

const BuyerRoutes = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  const getThemeOverride = (): {
    background?: string;
    screenBackground?: string;
    color?: string;
    headerTextColor?: keyof Theme['grey'];
    shouldUseFullWidth?: boolean;
    shouldIncludePadding?: boolean;
    onBack?: () => void;
    pageTitle?: string;
  } => {
    if (pathname === '/buyer/account') {
      return {
        shouldUseFullWidth: true,
        shouldIncludePadding: false,
      };
    }

    if (pathname.includes('/buyer/home')) {
      return {
        shouldUseFullWidth: true,
        shouldIncludePadding: false,
      };
    }

    if (pathname.includes('/buyer/product')) {
      return {
        shouldUseFullWidth: true,
        shouldIncludePadding: false,
        pageTitle: 'Product Details',
        onBack: history.goBack,
      };
    }

    if (
      (pathname.includes('/buyer/categories/') &&
        pathname.replace('/buyer/categories/', '').length > 0) ||
      pathname.includes('/buyer/favourites') ||
      pathname.includes('/buyer/recently-added') ||
      pathname.includes('/buyer/sellers') ||
      pathname.includes('/buyer/favourite-sellers') ||
      pathname.includes('/buyer/seller-details')
    ) {
      return {
        onBack: history.goBack,
      };
    }

    return {};
  };

  return (
    <DashboardLayout
      routes={ROUTES_ARRAY.filter((routes) => !routes.hideFromSidebar)}
      {...getThemeOverride()}
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
