import React from 'react';

import {
  Dashboard as DashboardSVG,
  AddBorder,
  Account as AccountSVG,
  FileCheck,
  Cart,
  CheckBorder,
  Bolt,
  // Crates,
  Cog,
} from 'components/base/SVG';
import DashboardLayout from 'components/layout/Dashboard';
import { SELLER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';
// Screens
import { Store } from 'types/store/Store';
import { Theme } from 'types/Theme';
import { useTheme } from 'utils/Theme';

import SellerAccountRoutes from './Account/account.routes';
import NotificationsSettings from './Account/NotificationsSettings';
import AddProduct from './AddProduct/addProduct.routes';
// import CratesManagement from './CratesManagement';
import DashboardRoutes from './Dashboard/dashboard.routes';
import MarketBoardRoutes from './MarketBoard/market-board.routes';
import MarketPriceDetail from './MarketPriceDetail';
import MarketPrices from './MarketPrices';
import Notifications from './Notifications';
import Selling from './Selling/selling.routes';
import Sold from './Sold/sold.routes';

const ROUTES: Routes = {
  DASHBOARD: {
    path: SELLER_ROUTES.DASHBOARD,
    title: 'Dashboard',
    children: <DashboardRoutes />,
    icon: DashboardSVG,
    nested: true,
  },
  SELLING: {
    path: SELLER_ROUTES.SELLING,
    title: 'Selling',
    children: <Selling />,
    icon: Cart,
    nested: true,
  },
  // Add Product
  ADD_PRODUCT: {
    path: SELLER_ROUTES.ADD_PRODUCT,
    title: 'Add a Product',
    children: <AddProduct />,
    icon: AddBorder,
    nested: true,
  },
  // Market Prices
  MARKET_PRICES: {
    path: SELLER_ROUTES.MARKET_PRICES,
    title: 'Market Prices',
    children: <MarketPrices />,
    icon: FileCheck,
  },
  //Market Board
  MARKET_BOARD: {
    path: SELLER_ROUTES.MARKET_BOARD,
    title: 'Market Board',
    children: <MarketBoardRoutes />,
    icon: Bolt,
    nested: true,
  },
  SOLD: {
    path: SELLER_ROUTES.SOLD,
    title: 'Sold',
    children: <Sold />,
    icon: CheckBorder,
    nested: true,
  },
  // CREATES_MANAGEMENT: {
  //   path: SELLER_ROUTES.CREATES_MANAGEMENT,
  //   title: 'Crates Management',
  //   children: <CratesManagement />,
  //   icon: Crates,
  //   nested: true,
  // },
  NOTIFICATIONS_SETTINGS: {
    path: SELLER_ROUTES.NOTIFICATIONS_SETTINGS,
    children: <NotificationsSettings />,
    title: 'Notifications Settings',
    icon: Cog,
  },
  ACCOUNT: {
    path: SELLER_ROUTES.ACCOUNT,
    title: 'Account',
    children: <SellerAccountRoutes />,
    icon: AccountSVG,
    nested: true,
  },
  NOTIFICATIONS: {
    path: SELLER_ROUTES.NOTIFICATIONS,
    children: <Notifications />,
    title: 'Notifications',
    hideFromSidebar: true,
  },
  MARKET_PRICE_DETAIL: {
    path: SELLER_ROUTES.MARKET_PRICE_DETAIL(),
    title: '',
    children: <MarketPriceDetail />,
    hideFromSidebar: true,
  },
};

const ROUTES_ARRAY: TRoute[] = Object.values(ROUTES).map((value) => value);

const SellerRoutes = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
  const { pathname } = location;
  const isTablet = useMediaQuery({ query: BREAKPOINTS.genericTablet });
  const creatingListingStatus = useSelector(
    (state: Store) => state.createListing
  );
  const isCreatListingSuccess = creatingListingStatus.data?.status === 200;

  const getThemeOverride = (): {
    background?: string;
    screenBackground?: string;
    headerTextColor?: keyof Theme['grey'];
    shouldIncludePadding?: boolean;
    onBack?: () => void;
    pageTitle?: string;
  } => {
    if (pathname.includes('/seller/selling/details')) {
      return {
        background: theme.grey.shade1,
        screenBackground: theme.grey.shade1,
        headerTextColor: 'shade9',
        shouldIncludePadding: false,
        onBack: history.goBack,
        pageTitle: 'Selling Details',
      };
    }

    if (pathname.includes('/seller/add-product/preview')) {
      return {
        background: isCreatListingSuccess
          ? theme.grey.shade9
          : theme.grey.shade1,
        screenBackground: isCreatListingSuccess
          ? theme.grey.shade9
          : theme.grey.shade1,
        headerTextColor: isCreatListingSuccess ? 'noshade' : 'shade9',
        shouldIncludePadding: false,
        onBack: history.goBack,
        pageTitle: 'Product Preview',
      };
    }

    if (pathname.includes(SELLER_ROUTES.SOLD) && isTablet) {
      return {
        background: theme.grey.shade8,
      };
    }

    if (pathname.includes(SELLER_ROUTES.ADD_PRODUCT)) {
      if (pathname.includes('/bulk-upload-preview')) {
        return {
          pageTitle: 'Bulk Spreadsheet Upload',
        };
      }

      return {
        shouldIncludePadding: false,
      };
    }

    if (pathname === SELLER_ROUTES.CREATES_MANAGEMENT) {
      return {
        pageTitle: 'Crates Management',
      };
    }

    if (pathname.includes(SELLER_ROUTES.MARKET_BOARD)) {
      return {
        pageTitle: 'Market Board',
      };
    }

    if (pathname.includes(SELLER_ROUTES.ADD_PRODUCT)) {
      return {
        pageTitle: 'Add Listing',
      };
    }

    if (pathname === SELLER_ROUTES.NOTIFICATIONS_SETTINGS) {
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
