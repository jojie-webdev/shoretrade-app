import React, { useEffect, useReducer, useState } from 'react';

import { MAIN_ROUTES } from 'consts';
import moment from 'moment';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import {
  loginActions,
  verifyActions,
  resendVerificationActions,
  forgotPasswordActions,
  resetPasswordActions,
} from 'store/actions';
import { Store } from 'types/store/Store';

import { ResetPasswordForm } from './ResetPassword.props';
import ResetPasswordView from './ResetPassword.view';

const ResetPassword = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { email } = qs.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  }) as {
    email: string;
  };
  const { code } = useParams<{ code: string }>();
  // if (!(email && code)) {
  //   history.push(MAIN_ROUTES.LANDING);
  // }

  const pending =
    useSelector((state: Store) => state.resetPassword.pending) || false;
  const [isTriggered, setIsTriggered] = useState(false);
  const error = useSelector((state: Store) => state.resetPassword.error) || '';
  const isError = (error || '').length > 0 && isTriggered;

  const savePassword = (data: ResetPasswordForm) => {
    if (!pending) {
      if (!isTriggered) {
        setIsTriggered(true);
      }
      dispatch(
        resetPasswordActions.request({
          password: data.newPassword,
          code,
          email,
        })
      );
    }
  };

  const generatedProps = {
    // generated props here
    pending,
    isError,
    savePassword,
  };
  return <ResetPasswordView {...generatedProps} />;
};

export default ResetPassword;
