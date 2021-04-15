import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { forgotPasswordActions } from 'store/actions';
import { Store } from 'types/store/Store';

import { ForgotPasswordForm } from './ForgotPassword.props';
import ForgotPasswordView from './ForgotPassword.view';

const ForgotPassword = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();

  const backToLogin = () => {
    history.goBack();
  };

  const pending =
    useSelector((state: Store) => state.forgotPassword.pending) || false;
  const requestSuccess =
    useSelector((state: Store) => state.forgotPassword.data?.status || 0) ===
    200;
  const [isTriggered, setIsTriggered] = useState(false);

  const success = requestSuccess && isTriggered;

  const resetPassword = (data: ForgotPasswordForm) => {
    if (!isTriggered) {
      setIsTriggered(true);
      dispatch(forgotPasswordActions.request(data));
    }
  };

  const generatedProps = {
    // generated props here
    pending,
    success,
    backToLogin,
    resetPassword,
  };
  return <ForgotPasswordView {...generatedProps} />;
};

export default ForgotPassword;
