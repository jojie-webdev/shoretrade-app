import React, { useReducer } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ROUTES, BUYER_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from 'store/actions';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';
import { useTheme } from 'utils/Theme';

import { Credentials } from './Login.props';
import LoginView from './Login.view';

const Login = (): JSX.Element => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const pending = useSelector((state: Store) => state.login.pending) || false;
  const isError =
    (useSelector((state: Store) => state.login.error) || '').length > 0;
  const login = (credentials: Credentials) => {
    dispatch(loginActions.request(credentials));
  };

  const goToForgotPassword = () => {
    dispatch(
      push(
        isSeller ? SELLER_ROUTES.FORGOT_PASSWORD : BUYER_ROUTES.FORGOT_PASSWORD
      )
    );
  };

  const generatedProps = {
    // generated props here
    login,
    pending,
    goToForgotPassword,
    isError,
  };
  return <LoginView {...generatedProps} />;
};

export default Login;
