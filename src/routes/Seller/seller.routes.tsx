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
import { SELLER_ROUTES, SELLER_ACCOUNT_ROUTES } from 'consts';
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  useHistory,
} from 'react-router-dom';
import { Routes, Route as TRoute } from 'types/Routes';
// Screens
import { Theme } from 'types/Theme';
import { useTheme } from 'utils/Theme';

import SellerAccountRoutes from './Account/account.routes';
import AddProduct from './AddProduct/addProduct.routes';
import DashboardRoutes from './Dashboard/dashboard.routes';
import MarketPriceDetail from './MarketPriceDetail';
import MarketPrices from './MarketPrices';
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
  // Market Prices
  MARKET_PRICES: {
    path: SELLER_ROUTES.MARKET_PRICES,
    title: 'Market Prices',
    children: <MarketPrices />,
    icon: FileCheck,
  },
  MARKET_PRICE_DETAIL: {
    path: SELLER_ROUTES.MARKET_PRICE_DETAIL(),
    title: '',
    children: <MarketPriceDetail />,
    hideFromSidebar: true,
  },

  // Add Product
  ADD_PRODUCT: {
    path: SELLER_ROUTES.ADD_PRODUCT,
    title: 'Add Product',
    children: <AddProduct />,
    icon: AddBorder,
    nested: true,
  },
  SELLING: {
    path: SELLER_ROUTES.SELLING,
    title: 'Selling',
    children: <Selling />,
    icon: Cart,
    nested: true,
  },
  SOLD: {
    path: SELLER_ROUTES.SOLD,
    title: 'Sold',
    children: <Sold />,
    icon: CheckBorder,
    nested: true,
  },
  ACCOUNT: {
    path: SELLER_ACCOUNT_ROUTES.LANDING,
    title: 'Account',
    children: <SellerAccountRoutes />,
    icon: AccountSVG,
    nested: true,
  },
};

const ROUTES_ARRAY: TRoute[] = Object.values(ROUTES).map((value) => value);

const SellerRoutes = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();
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
    if (pathname.includes('/seller/selling/details')) {
      return {
        color: theme.grey.shade9,
        background: theme.grey.shade1,
        screenBackground: theme.grey.shade1,
        headerTextColor: 'shade9',
        shouldUseFullWidth: true,
        shouldIncludePadding: false,
        onBack: history.goBack,
        pageTitle: 'Selling Details',
      };
    }

    if (pathname.includes('/seller/add-product/preview')) {
      return {
        color: theme.grey.shade9,
        background: theme.grey.shade1,
        screenBackground: theme.grey.shade1,
        headerTextColor: 'shade9',
        shouldUseFullWidth: true,
        shouldIncludePadding: false,
        onBack: history.goBack,
        pageTitle: 'Product Preview',
      };
    }

    if (pathname.includes(SELLER_ROUTES.ADD_PRODUCT)) {
      return {
        shouldIncludePadding: false,
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
