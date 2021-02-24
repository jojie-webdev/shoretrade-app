import React, { useEffect } from 'react';

import { MAIN_ROUTES, SELLER_ROUTES, BUYER_ROUTES } from 'consts';
import { useSelector, useDispatch } from 'react-redux';
import {
  Route,
  Switch,
  Redirect,
  useHistory,
  useLocation,
} from 'react-router-dom';
import getUserActions from 'store/actions/getUser';
import { Routes } from 'types/Routes';
import { Store } from 'types/store/Store';

import Authenticate from './Auth/Authenticate';
import ForgotPassword from './Auth/ForgotPassword';
import Login from './Auth/Login';
import Onboarding from './Auth/Onboarding';
import Register from './Auth/Register';
import ResetPassword from './Auth/ResetPassword';
import Verify2FA from './Auth/Verify2FA';
import BuyerRoutes from './Buyer/buyer.routes';
import SellerRoutes from './Seller/seller.routes';

export const ROUTES: Routes = {
  ROOT: {
    path: MAIN_ROUTES.LANDING,
    children: (
      <Redirect
        to={{
          pathname: BUYER_ROUTES.LOGIN,
        }}
      />
    ),
  },
  LOGIN: {
    path: MAIN_ROUTES.LOGIN,
    children: <Login />,
  },
  // Seller Unauthenticated Routes
  SELLER_LOGIN: {
    path: SELLER_ROUTES.LOGIN,
    children: <Login />,
  },
  SELLER_VERIFY2FA: {
    path: SELLER_ROUTES.VERIFY2FA,
    children: <Verify2FA />,
  },
  AUTHENTICATE: {
    exact: true,
    path: MAIN_ROUTES.AUTHENTICATE,
    children: <Authenticate />,
  },
  FORGOT_PASSWORD: {
    path: MAIN_ROUTES.FORGOT_PASSWORD,
    children: <ForgotPassword />,
  },
  RESET_PASSWORD: {
    path: MAIN_ROUTES.RESET_PASSWORD,
    children: <ResetPassword />,
  },
  // Seller Unauthenticated Routes
  // SELLER_LOGIN: {
  //   path: SELLER_ROUTES.LOGIN,
  //   // children: <Login />,
  //   children: (
  //     <Redirect
  //       to={{
  //         pathname: MAIN_ROUTES.LOGIN,
  //       }}
  //     />
  //   ),
  // },
  SELLER_FORGOT_PASSWORD: {
    path: SELLER_ROUTES.FORGOT_PASSWORD,
    children: <ForgotPassword />,
  },
  SELLER_REGISTER: {
    path: SELLER_ROUTES.REGISTER,
    children: <Register />,
  },
  SELLER_ONBOARDING: {
    path: SELLER_ROUTES.ONBOARDING,
    children: <Onboarding />,
  },
  // Buyer Unauthenticated Routes
  BUYER_ONBOARDING: {
    path: BUYER_ROUTES.ONBOARDING,
    children: <Onboarding />,
  },
  BUYER_LOGIN: {
    path: BUYER_ROUTES.LOGIN,
    children: <Login />,
  },
  BUYER_VERIFY2FA: {
    path: BUYER_ROUTES.VERIFY2FA,
    children: <Verify2FA />,
  },
  // BUYER_LOGIN: {
  //   path: BUYER_ROUTES.LOGIN,
  //   // children: <Login />,
  //   children: (
  //     <Redirect
  //       to={{
  //         pathname: MAIN_ROUTES.LOGIN,
  //       }}
  //     />
  //   ),
  // },
  BUYER_FORGOT_PASSWORD: {
    path: BUYER_ROUTES.FORGOT_PASSWORD,
    children: <ForgotPassword />,
  },
  BUYER_REGISTER: {
    path: BUYER_ROUTES.REGISTER,
    children: <Register />,
  },

  // Nested Routes
  BUYER: {
    path: BUYER_ROUTES.ROOT,
    children: <BuyerRoutes />,
    nested: true,
    protected: true,
  },
  SELLER: {
    path: SELLER_ROUTES.ROOT,
    children: <SellerRoutes />,
    nested: true,
    protected: true,
  },
};

const UNAUTHENTICATED_SELLER_ROUTES = [
  MAIN_ROUTES.LANDING,
  MAIN_ROUTES.LOGIN,
  MAIN_ROUTES.VERIFY,
  MAIN_ROUTES.FORGOT_PASSWORD,
  MAIN_ROUTES.AUTHENTICATE.replace(':token', ''),
  SELLER_ROUTES.LOGIN,
  SELLER_ROUTES.VERIFY2FA,
  SELLER_ROUTES.ONBOARDING,
  SELLER_ROUTES.REGISTER,
  SELLER_ROUTES.FORGOT_PASSWORD,
];

const UNAUTHENTICATED_BUYER_ROUTES = [
  MAIN_ROUTES.LANDING,
  MAIN_ROUTES.LOGIN,
  MAIN_ROUTES.VERIFY,
  MAIN_ROUTES.FORGOT_PASSWORD,
  MAIN_ROUTES.AUTHENTICATE.replace(':token', ''),
  BUYER_ROUTES.LOGIN,
  BUYER_ROUTES.VERIFY2FA,
  BUYER_ROUTES.ONBOARDING,
  BUYER_ROUTES.REGISTER,
  BUYER_ROUTES.FORGOT_PASSWORD,
];

const RoutesComponent = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated =
    (useSelector((state: Store) => state.auth.token) || '').length > 0;
  const authenticatedUserType =
    useSelector((state: Store) => state.auth.type) || '';
  const currentPath = location.pathname;

  useEffect(() => {
    if (isAuthenticated) {
      // On authenticated, fetch user.
      dispatch(getUserActions.request());
      // Redirects;
      if (
        authenticatedUserType === 'seller' &&
        (UNAUTHENTICATED_SELLER_ROUTES.some((r) => currentPath.includes(r)) ||
          currentPath.startsWith('/buyer'))
      ) {
        history.push(SELLER_ROUTES.ROOT);
      }
      if (
        authenticatedUserType === 'buyer' &&
        (UNAUTHENTICATED_BUYER_ROUTES.some((r) => currentPath.includes(r)) ||
          currentPath.startsWith('/seller'))
      ) {
        history.push(BUYER_ROUTES.ROOT);
      }
    }
  }, [isAuthenticated, authenticatedUserType]);

  return (
    <Switch>
      {Object.values(ROUTES).map((r) => {
        const isSellerRoute = r.path.includes('seller');
        return (
          <Route key={r.path} path={r.path} exact={!r.nested}>
            {!isAuthenticated && r.protected ? (
              <Redirect
                to={{
                  pathname: isSellerRoute
                    ? SELLER_ROUTES.LOGIN
                    : BUYER_ROUTES.LOGIN,
                }}
              />
            ) : (
              r.children
            )}
          </Route>
        );
      })}
      <Route>
        <h1>404 route</h1>
      </Route>
    </Switch>
  );
};

export default RoutesComponent;
