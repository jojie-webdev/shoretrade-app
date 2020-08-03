import React, { useReducer } from 'react';

import { createUpdateReducer } from 'utils/Hooks';

import { Credentials } from './Login.props';
import LoginView from './Login.view';

const Login = (): JSX.Element => {
  const [credentials, updateCredentials] = useReducer(
    createUpdateReducer<Credentials>(),
    {
      email: '',
      password: '',
    }
  );

  const generatedProps = {
    // generated props here
    credentials,
    updateCredentials,
  };
  return <LoginView {...generatedProps} />;
};

export default Login;
