import React from 'react';

import { SELLER_ROUTES, BUYER_ROUTES, MAIN_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginActions } from 'store/actions';
import { Store } from 'types/store/Store';
import { useTheme } from 'utils/Theme';

import { Credentials } from './Login.props';
import LoginView from './Login.view';

const Login = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();
  const pending = useSelector((state: Store) => state.login.pending) || false;

  const isError =
    (useSelector((state: Store) => state.login.error) || '').length > 0;

  const login = (credentials: Credentials) => {
    dispatch(loginActions.request(credentials));
  };

  const goToForgotPassword = () => {
    history.push(MAIN_ROUTES.FORGOT_PASSWORD);
  };

  const goToSellerRegister = () => {
    history.push(SELLER_ROUTES.REGISTER);
  };

  const goToBuyerRegister = () => {
    history.push(BUYER_ROUTES.REGISTER);
  };

  const generatedProps = {
    // generated props here
    login,
    pending,
    goToForgotPassword,
    goToSellerRegister,
    goToBuyerRegister,
    isError,
  };
  return <LoginView {...generatedProps} />;
};

export default Login;
