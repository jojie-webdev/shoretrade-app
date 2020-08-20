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

import ForgotPassword from './Auth/ForgotPassword';
import Login from './Auth/Login';
import Onboarding from './Auth/Onboarding';
import Register from './Auth/Register';
import Verify2FA from './Auth/Verify2FA';
import BuyerRoutes from './Buyer/buyer.routes';
import SellerRoutes from './Seller/seller.routes';

export const ROUTES: Routes = {
  ROOT: {
    path: MAIN_ROUTES.LANDING,
    children: <h1>Landing Page if it exists</h1>,
  },
  SELLER_LOGIN: {
    path: SELLER_ROUTES.LOGIN,
    children: <Login />,
  },
  SELLER_FORGOT_PASSWORD: {
    path: SELLER_ROUTES.FORGOT_PASSWORD,
    children: <ForgotPassword />,
  },
  SELLER_VERIFY2FA: {
    path: SELLER_ROUTES.VERIFY2FA,
    children: <Verify2FA />,
  },
  SELLER_REGISTER: {
    path: SELLER_ROUTES.REGISTER,
    children: <Register />,
  },
  SELLER_ONBOARDING: {
    path: SELLER_ROUTES.ONBOARDING,
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
  SELLER_ROUTES.LOGIN,
  SELLER_ROUTES.VERIFY2FA,
  SELLER_ROUTES.ONBOARDING,
  SELLER_ROUTES.REGISTER,
  SELLER_ROUTES.FORGOT_PASSWORD,
];

const UNAUTHENTICATED_BUYER_ROUTES = [
  SELLER_ROUTES.LOGIN,
  SELLER_ROUTES.VERIFY2FA,
  SELLER_ROUTES.ONBOARDING,
  SELLER_ROUTES.REGISTER,
  SELLER_ROUTES.FORGOT_PASSWORD,
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

      // Redirects
      if (
        authenticatedUserType === 'seller' &&
        (UNAUTHENTICATED_SELLER_ROUTES.includes(currentPath) ||
          currentPath.includes('buyer'))
      ) {
        history.push(SELLER_ROUTES.ROOT);
      }

      if (
        authenticatedUserType === 'buyer' &&
        (UNAUTHENTICATED_BUYER_ROUTES.includes(currentPath) ||
          currentPath.includes('seller'))
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
