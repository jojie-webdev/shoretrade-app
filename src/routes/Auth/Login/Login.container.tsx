import React, { useReducer } from 'react';

import { useDispatch } from 'react-redux';
import { loginActions } from 'store/actions';
import { createUpdateReducer } from 'utils/Hooks';

import { Credentials } from './Login.props';
import LoginView from './Login.view';

const Login = (): JSX.Element => {
  const dispatch = useDispatch();

  const [credentials, updateCredentials] = useReducer(
    createUpdateReducer<Credentials>(),
    {
      email: '',
      password: '',
    }
  );

  const login = () => {
    dispatch(loginActions.request(credentials));
  };

  const generatedProps = {
    // generated props here
    credentials,
    updateCredentials,
    login,
  };
  return <LoginView {...generatedProps} />;
};

export default Login;
