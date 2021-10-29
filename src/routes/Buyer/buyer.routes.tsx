import React from 'react';

import {
  Search as SearchIcon,
  Account as AccountIcon,
  Home as HomeIcon,
  Category as CategoryIcon,
  Notepad as OrderIcon,
  Bolt as BoltIcon,
  Listing as ListingIcon,
  Cog as CogIcon,
} from 'components/base/SVG';
import DashboardLayout from 'components/layout/Dashboard';
import { BUYER_ROUTES } from 'consts';
import { useSelector } from 'react-redux';
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';
import { Store } from 'types/store/Store';
import { Theme } from 'types/Theme';

import Account from './Account/accounts.routes';
import NotificationsSettings from './Account/NotificationsSettings';
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
import Listings from './Listings';
import Market from './MarketRequests/market-requests.routes';
import Notifications from './Notifications';
import Orders from './Orders';
import ProductDetails from './ProductDetails';
import Search from './Search';
import SellerDetails from './SellerDetails';

const ROUTES: Routes = {
  HOME: {
    path: BUYER_ROUTES.HOME,
    children: <Home />,
    title: 'Home',
    icon: HomeIcon,
  },
  MARKET_REQUESTS: {
    path: BUYER_ROUTES.MARKET_REQUESTS,
    children: <Market />,
    title: 'Market Requests',
    icon: BoltIcon,
    nested: true,
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
    children: <Search />,
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
  LISTING: {
    path: BUYER_ROUTES.ALL_LISTING,
    children: <Listings />,
    title: 'All Listings',
    icon: ListingIcon,
  },
  NOTIFICATIONS_SETTINGS: {
    path: BUYER_ROUTES.NOTIFICATIONS_SETTINGS,
    children: <NotificationsSettings />,
    title: 'Notifications Settings',
    icon: CogIcon,
  },
  ACCOUNT: {
    path: BUYER_ROUTES.ACCOUNT,
    children: <Account />,
    title: 'Account',
    icon: AccountIcon,
    nested: true,
  },
  NOTIFICATIONS: {
    path: BUYER_ROUTES.NOTIFICATIONS,
    children: <Notifications />,
    title: 'Notifications',
    hideFromSidebar: true,
  },
  CHECKOUT: {
    path: BUYER_ROUTES.CHECKOUT,
    children: <Checkout />,
    title: 'Checkout',
    hideFromSidebar: true,
  },
  PRODUCT_DETAILS: {
    path: BUYER_ROUTES.PRODUCT_DETAIL(),
    children: <ProductDetails />,
    title: 'Product Details',
    hideFromSidebar: true,
  },
  SELLER_DETAILS: {
    path: BUYER_ROUTES.SELLER_DETAILS(),
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
  interface ILocationState {
    ref?: string;
    title?: string;
  }

  const locationState: ILocationState | any = location?.state || {};

  const firstName =
    useSelector((state: Store) => state.getUser.data?.data.user.firstName) ||
    '';

  const getThemeOverride = (): {
    background?: string;
    screenBackground?: string;
    headerTextColor?: keyof Theme['grey'];
    shouldIncludePadding?: boolean;
    onBack?: () => void;
    pageTitle?: string;
  } => {
    if (pathname.includes('/buyer/home')) {
      return {
        pageTitle: firstName ? `Hello, ${firstName}` : '',
      };
    }

    if (pathname.includes('/buyer/product')) {
      return {
        pageTitle: 'Product Details',
        onBack: history.goBack,
      };
    }

    if (pathname === '/buyer/categories' && locationState?.ref === 'home') {
      return {
        onBack: history.goBack,
      };
    }

    if (
      pathname.includes('/buyer/categories/') &&
      pathname.replace('/buyer/categories/', '').length > 0
    ) {
      return {
        pageTitle: locationState.title || 'Categories',
        onBack: history.goBack,
      };
    }

    if (
      (pathname.includes('/buyer/categories/') &&
        pathname.replace('/buyer/categories/', '').length > 0) ||
      pathname.includes('/buyer/favourites') ||
      pathname.includes('/buyer/recently-added') ||
      pathname.includes('/buyer/sellers') ||
      pathname.includes('/buyer/favourite-sellers')
    ) {
      return {
        onBack: history.goBack,
      };
    }

    if (pathname.includes('/buyer/seller-details')) {
      return {
        pageTitle: 'Seller',
        onBack: history.goBack,
      };
    }

    if (pathname.includes('/buyer/market-requests/')) {
      return {
        pageTitle: 'Market Request',
        onBack: history.goBack,
      };
    }

    if (pathname.includes('/buyer/all-listings')) {
      return {
        pageTitle: 'All Listings',
        onBack: history.goBack,
      };
    }

    if (pathname.includes('/buyer/notifications-settings')) {
      return {
        pageTitle: 'Notifications Settings',
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
          <Redirect to="/buyer/home" />
        </Route>
      </Switch>
    </DashboardLayout>
  );
};

export default BuyerRoutes;
