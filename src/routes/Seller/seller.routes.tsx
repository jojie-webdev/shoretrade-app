import React from 'react';

import {
  Dashboard as DashboardSVG,
  AddBorder,
  Account as AccountSVG,
  QuestionCircle as QuestionIcon,
  ChartLine,
  BulletList as BulletListIcon,
  CheckCircle as CheckCircleIcon,
  CatchNet as CatchNetIcon,
  Crates2 as CratesIcon,
  Cog,
  QrCodeScan as BarcodeSVG,
  MarketBoard,
} from 'components/base/SVG';
import DashboardLayout from 'components/layout/Dashboard';
import { SELLER_ACCOUNT_ROUTES, SELLER_ROUTES } from 'consts';
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
import BarcodeScanner from './BarcodeScanner';
import CratesManagement from './CratesManagement';
import DashboardRoutes from './Dashboard/dashboard.routes';
import HelpAndSupport from './HelpAndSupport/HelpAndSupport.routes';
import MarketBoardRoutes from './MarketBoard/negotiations-and-requests.routes';
import MarketPriceDetail from './MarketPriceDetail';
import MarketDataRoutes from './MarketPrices/market-data.routes';
import Notifications from './Notifications';
import Selling from './Selling/selling.routes';
import Sold from './Sold/sold.routes';
import Upgrade from './Upgrade';

const ROUTES: Routes = {
  DASHBOARD: {
    path: SELLER_ROUTES.DASHBOARD,
    title: 'Dashboard',
    children: <DashboardRoutes />,
    icon: DashboardSVG,
    nested: true,
  },
  // Market Prices
  MARKET_DATA: {
    path: SELLER_ROUTES.MARKET_DATA,
    title: 'Market Data',
    children: <MarketDataRoutes />,
    icon: ChartLine,
    nested: true,
  },
  //Market Board
  NEGOTIATIONS_AND_REQUESTS: {
    path: SELLER_ROUTES.NEGOTIATIONS_AND_REQUESTS,
    title: 'Negotiations & Requests',
    children: <MarketBoardRoutes />,
    icon: MarketBoard,
    nested: true,
  },
  // Add Product
  ADD_PRODUCT: {
    path: SELLER_ROUTES.ADD_PRODUCT,
    title: 'Add a Listing',
    children: <AddProduct />,
    icon: AddBorder,
    nested: true,
  },
  SELLING: {
    path: SELLER_ROUTES.SELLING,
    title: 'Selling',
    children: <Selling />,
    icon: BulletListIcon,
    nested: true,
  },
  SOLD: {
    path: SELLER_ROUTES.SOLD,
    title: 'Sold',
    children: <Sold />,
    icon: CheckCircleIcon,
    nested: true,
  },
  BARCODE_SCANNER: {
    path: SELLER_ROUTES.BARCODE_SCANNER,
    title: 'Barcode Scanner',
    children: <BarcodeScanner />,
    icon: BarcodeSVG,
    nested: true,
  },
  CREATES_MANAGEMENT: {
    path: SELLER_ROUTES.CREATES_MANAGEMENT,
    title: 'Crates Management',
    children: <CratesManagement />,
    icon: CratesIcon,
    nested: true,
  },
  NOTIFICATIONS_SETTINGS: {
    path: SELLER_ROUTES.NOTIFICATIONS_SETTINGS,
    children: <NotificationsSettings />,
    title: 'Notifications Settings',
    icon: Cog,
  },
  HELP_AND_SUPPORT: {
    path: SELLER_ROUTES.HELP_AND_SUPPORT,
    title: 'Help & Support',
    children: <HelpAndSupport />,
    icon: QuestionIcon,
    nested: true,
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
  // UPGRADE: {
  //   path: SELLER_ROUTES.UPGRADE,
  //   children: <Upgrade />,
  //   title: 'Upgrade',
  //   hideFromSidebar: true,
  // },
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

  const subscription = useSelector((store: Store) => store.subscription);
  const editableListing = useSelector((state: Store) => state.editableListing);
  const isAccountDeactivated = subscription.isAccountDeactivated;

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
      const isExisting = (editableListing?.currentListingId || '').length > 0;
      return {
        shouldIncludePadding: false,
        pageTitle: isExisting ? 'Edit a Listing' : 'Add a Listing',
      };
    }

    if (pathname === SELLER_ROUTES.CREATES_MANAGEMENT) {
      return {
        pageTitle: 'Crates Management',
      };
    }

    if (pathname.includes(SELLER_ROUTES.NEGOTIATIONS_AND_REQUESTS)) {
      return {
        pageTitle: 'Negotiations & Requests',
      };
    }

    if (pathname.includes(SELLER_ROUTES.HELP_AND_SUPPORT)) {
      return {
        pageTitle: 'Help & Support',
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
        {ROUTES_ARRAY.filter(
          (r) =>
            (r.title === 'Account' || !isAccountDeactivated) &&
            (subscription.isFreeTrial ||
              (!subscription.isFreeTrial && r.title !== 'Upgrade'))
        ).map((r) => (
          <Route key={r.path} path={`${r.path}`} exact={!r.nested}>
            {r.children}
          </Route>
        ))}
        <Route>
          <Redirect
            to={
              isAccountDeactivated
                ? SELLER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN
                : '/seller/dashboard'
            }
          />
        </Route>
      </Switch>
    </DashboardLayout>
  );
};

export default SellerRoutes;
