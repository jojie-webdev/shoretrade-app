import React, { useEffect } from 'react';

import { SELLER_ROUTES, BUYER_ROUTES, MAIN_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { loginActions } from 'store/actions';
import { Store } from 'types/store/Store';
import { useTheme } from 'utils/Theme';

import { Credentials } from './Login.props';
import LoginView from './Login.view';
import useLocalStorage from 'utils/Hooks/useLocalStorage';

const Login = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const pending = useSelector((state: Store) => state.login.pending) || false;
  const [isAcceptClicked, setIsAcceptClicked] = useLocalStorage(
    'isTermsAndConAccepted',
    false
  );

  const isError =
    (useSelector((state: Store) => state.login.error) || '').length > 0;

  const login = (credentials: Credentials) => {
    dispatch(loginActions.request(credentials));
  };
  const errorMessage = useSelector((state: Store) => state.login.error) || '';

  const isLoggedOut = useSelector((state: Store) => !!state.logout.data);

  const switchType = () => {
    history.push(isSeller ? BUYER_ROUTES.LOGIN : SELLER_ROUTES.LOGIN);
  };

  const goToForgotPassword = () => {
    history.push(
      isSeller ? SELLER_ROUTES.FORGOT_PASSWORD : BUYER_ROUTES.FORGOT_PASSWORD
    );
  };

  const goToRegister = () => {
    history.push(isSeller ? SELLER_ROUTES.REGISTER : BUYER_ROUTES.REGISTER);
  };

  useEffect(() => {
    // reset terms
    setIsAcceptClicked(false);
  }, []);

  const generatedProps = {
    // generated props here
    login,
    pending,
    goToForgotPassword,
    switchType,
    goToRegister,
    isError,
    errorMessage,
    isLoggedOut,
  };
  return <LoginView {...generatedProps} />;
};

export default Login;
