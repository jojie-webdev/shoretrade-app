import React, { useReducer } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from 'store/actions';
import { Store } from 'types/store/Store';
import { createUpdateReducer } from 'utils/Hooks';

import { Credentials } from './Login.props';
import LoginView from './Login.view';

const Login = (): JSX.Element => {
  const dispatch = useDispatch();
  const pending = useSelector((state: Store) => state.login.pending) || false;
  const login = (credentials: Credentials) => {
    dispatch(loginActions.request(credentials));
  };

  const generatedProps = {
    // generated props here
    login,
    pending,
  };
  return <LoginView {...generatedProps} />;
};

export default Login;
