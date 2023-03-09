import React, { useEffect, useMemo, useState } from 'react';

import {
  Search as SearchIcon,
  Account as AccountIcon,
  Home3 as HomeIcon,
  Category as CategoryIcon,
  Notepad as OrderIcon,
  CatchNet as CatchNetIcon,
  Listing as ListingIcon,
  Cog as CogIcon,
  QrCodeScan as QRCodeScanIcon,
  QuestionCircle as QuestionIcon,
  Crates2 as CratesIcon,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import DashboardLayout from 'components/layout/Dashboard';
import ConfirmationModal from 'components/module/ConfirmationModal';
import { BUYER_ACCOUNT_ROUTES, BUYER_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';
import BarcodeScanner from 'routes/Buyer/BarcodeScanner';
import {
  getPaymentMethodsActions,
  getSubscriptionPlansActions,
  logoutActions,
  subscriptionActions,
  updateSubscriptionPlanActions,
} from 'store/actions';
import paySubscription from 'store/reducers/paySubscription';
import { Routes, Route as TRoute } from 'types/Routes';
import { Store } from 'types/store/Store';
import { Theme } from 'types/Theme';

import Account from './Account/accounts.routes';
import NotificationsSettings from './Account/NotificationsSettings';
import Categories from './Categories/categories.routes';
import CategoriesPreview from './Categories/Preview';
import Checkout from './Checkout';
import CratesManagement from './CratesManagement';
import HelpAndSupport from './HelpAndSupport/HelpAndSupport.routes';
import Home from './Home';
import Favourites from './Home/Favourites';
import RecentlyAdded from './Home/RecentlyAdded';
import SellerFavouritesContainer from './Home/SellerFavourites/SellerFavourites.container';
import SellerLanding from './Home/SellerLanding';
import Listings from './Listings';
import NegotiationCheckout from './NegotiationCheckout';
import Market from './NegotiationsAndRequests/negotiations-and-requests.routes';
import Notifications from './Notifications';
import Orders from './Orders';
import ProductDetails from './ProductDetails';
import Search from './Search';
import SellerDetails from './SellerDetails';
import Upgrade from './Upgrade';

const ROUTES: Routes = {
  HOME: {
    path: BUYER_ROUTES.HOME,
    children: <Home />,
    title: 'Home',
    icon: HomeIcon,
  },
  SEARCH: {
    path: BUYER_ROUTES.SEARCH,
    children: <Search />,
    title: 'Search',
    icon: SearchIcon,
  },
  CATEGORIES: {
    path: BUYER_ROUTES.CATEGORIES,
    children: <Categories />,
    title: 'Categories',
    icon: CategoryIcon,
    nested: true,
  },
  LISTING: {
    path: BUYER_ROUTES.ALL_LISTING,
    children: <Listings />,
    title: 'All Listings',
    icon: ListingIcon,
  },
  NEGOTIATIONS_AND_REQUESTS: {
    path: BUYER_ROUTES.NEGOTIATIONS_AND_REQUESTS,
    children: <Market />,
    title: 'Negotiations And Requests',
    icon: CatchNetIcon,
    nested: true,
  },
  ORDERS: {
    path: BUYER_ROUTES.ORDERS,
    children: <Orders />,
    title: 'Orders',
    icon: OrderIcon,
  },
  BARCODE_SCANNER: {
    path: BUYER_ROUTES.BARCODE_SCANNER,
    title: 'Barcode Scanner',
    children: <BarcodeScanner />,
    icon: QRCodeScanIcon,
    nested: true,
  },
  CREATES_MANAGEMENT: {
    path: BUYER_ROUTES.CRATES_MANAGEMENT,
    title: 'Crates Management',
    children: <CratesManagement />,
    icon: CratesIcon,
    nested: true,
  },
  NOTIFICATIONS_SETTINGS: {
    path: BUYER_ROUTES.NOTIFICATIONS_SETTINGS,
    children: <NotificationsSettings />,
    title: 'Notifications Settings',
    icon: CogIcon,
  },
  HELP_AND_SUPPORT: {
    path: BUYER_ROUTES.HELP_AND_SUPPORT,
    children: <HelpAndSupport />,
    title: 'Help & Support',
    icon: QuestionIcon,
    nested: true,
  },
  ACCOUNT: {
    path: BUYER_ROUTES.ACCOUNT,
    children: <Account />,
    title: 'Account',
    icon: AccountIcon,
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
  SEARCH_PREVIEW: {
    path: BUYER_ROUTES.SEARCH_PREVIEW(),
    children: <CategoriesPreview />,
    title: 'Search',
    hideFromSidebar: true,
  },
  NOTIFICATIONS: {
    path: BUYER_ROUTES.NOTIFICATIONS,
    children: <Notifications />,
    title: 'Notifications',
    hideFromSidebar: true,
  },
  NEGOTIATION_CHECKOUT: {
    path: BUYER_ROUTES.NEGOTIATION_CHECKOUT(),
    children: <NegotiationCheckout />,
    title: 'Checkout',
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
  UPGRADE: {
    path: BUYER_ROUTES.UPGRADE,
    children: <Upgrade />,
    title: 'Upgrade',
    hideFromSidebar: true,
  },
};

const ROUTES_ARRAY: TRoute[] = Object.values(ROUTES).map((value) => value);

const BuyerRoutes = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const [showRenewModal, setShowRenewModal] = useState(false);
  const { pathname } = location;
  interface ILocationState {
    ref?: string;
    title?: string;
  }

  const locationState: ILocationState | any = location?.state || {};

  const user = useSelector((store: Store) => store.getUser.data?.data.user);
  const company = user?.companies[0];

  const defaultCardId =
    useSelector(
      (state: Store) => state.getPaymentMethods.data?.data.data?.defaultCard
    ) || '';

  const firstName =
    useSelector((state: Store) => state.getUser.data?.data.user.firstName) ||
    '';

  const isFreeTrial = useSelector(
    (store: Store) => store.subscription.isFreeTrial
  );

  const companyPlan = useSelector(
    (store: Store) => store.getCompanyPlan?.data?.data
  );

  const subscriptionPlans = useSelector(
    (store: Store) => store.getSubscriptionPlans?.data?.data
  );

  const getPaymentMethods = () => {
    if (company?.id) {
      dispatch(getPaymentMethodsActions.request({ companyId: company?.id }));
    }
  };

  const hasInactiveSubscription = useMemo(() => {
    if (companyPlan) {
      if (companyPlan.activePlans.length < 1 && companyPlan.isApprovedCompany) {
        return true;
      }
      return companyPlan.flags.hasInactiveSubscription;
    }
    return false;
  }, [companyPlan]);

  useEffect(() => {
    dispatch(getSubscriptionPlansActions.request({}));
  }, []);

  useEffect(() => {
    if (company) {
      getPaymentMethods();
    }
  }, [company]);

  useEffect(() => {
    if (companyPlan) {
      if (companyPlan.activePlans.length < 1 && companyPlan.isApprovedCompany) {
        if (
          location.pathname !== BUYER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN &&
          location.pathname !== BUYER_ACCOUNT_ROUTES.PLAN_PAYMENT_METHOD &&
          location.pathname !== BUYER_ACCOUNT_ROUTES.LANDING &&
          location.pathname !== BUYER_ACCOUNT_ROUTES.CREDIT_CARD
        ) {
          setShowRenewModal(true);
        }
      } else {
        setShowRenewModal(false);
      }
    }
  }, [companyPlan]);

  useEffect(() => {
    // console.log(subscriptionPlans);
  }, [subscriptionPlans]);

  const handleRenew = () => {
    if (company?.id) {
      history.push(BUYER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN);
      setShowRenewModal(false);
      // dispatch(
      //   updateSubscriptionPlanActions.request({
      //     companyId: company?.id,
      //     payment: {
      //       existingCard: defaultCardId,
      //     },
      //     subscriptionPlanId: subscriptionPlans?.find((plan) =>
      //       plan.name.toUpperCase().includes('BASE')
      //     )?.id,
      //   })
      // );
    }
  };

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

    if (pathname === '/buyer/help-' && locationState?.ref === 'home') {
      return {
        onBack: history.goBack,
      };
    }

    if (pathname.includes(BUYER_ROUTES.HELP_AND_SUPPORT)) {
      return {
        pageTitle: 'Help & Support',
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

    if (pathname.includes('/buyer/negotiations-and-requests/')) {
      return {
        pageTitle: 'Negotiations And Requests',
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
      <ConfirmationModal
        isOpen={showRenewModal}
        title="Renew your subscription"
        description={
          <>
            <Typography variant="body" color="shade6">
              To gain access to your account, you will need to renew your
              subscription.{' '}
            </Typography>
            <Typography variant="body" color="shade6">
              Press Renew Subscription to confirm your payment details and
              payment frequency. The relevant amount will be debited from your
              nominated card and once successfully received, your account will
              be reactivated.
            </Typography>
          </>
        }
        actionText="Renew Subscription"
        cancelText="Logout"
        hideClose
        onClickClose={() => {
          dispatch(logoutActions.request());
          setShowRenewModal(false);
        }}
        action={() => {
          handleRenew();
        }}
        cancel={() => {
          dispatch(logoutActions.request());
        }}
        style={{ width: '686px' }}
      />
      <Switch>
        {ROUTES_ARRAY.filter(
          (r) =>
            (r.title === 'Account' || !hasInactiveSubscription) &&
            (isFreeTrial || (!isFreeTrial && r.title !== 'Upgrade'))
        ).map((r) => (
          <Route key={`${r.path}`} path={`${r.path}`} exact={!r.nested}>
            {r.children}
          </Route>
        ))}
        <Route>
          <Redirect
            to={
              hasInactiveSubscription
                ? BUYER_ACCOUNT_ROUTES.SUBSCRIPTION_PLAN
                : '/buyer/home'
            }
          />
        </Route>
      </Switch>
    </DashboardLayout>
  );
};

export default BuyerRoutes;
