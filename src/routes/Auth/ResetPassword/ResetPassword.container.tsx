import React, { useEffect, useState } from 'react';

import { AxiosError, AxiosResponse } from 'axios';
import { BUYER_ROUTES, MAIN_ROUTES, SELLER_ROUTES } from 'consts';
import qs from 'qs';
import { OsTypes, osName } from 'react-device-detect';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { resetPasswordActions } from 'store/actions';
import { Store } from 'types/store/Store';

import { ResetPasswordForm } from './ResetPassword.props';
import ResetPasswordView from './ResetPassword.view';

const ResetPassword = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { email, barcode } = qs.parse(useLocation().search, {
    ignoreQueryPrefix: true,
  }) as {
    email: string;
    barcode?: string;
  };
  const { code } = useParams<{ code: string }>();
  if (!(email && code)) {
    history.push(MAIN_ROUTES.LANDING);
  }

  const pending =
    useSelector((state: Store) => state.resetPassword.pending) || false;
  const [isTriggered, setIsTriggered] = useState(false);
  const [noAppFound, setNoAppFound] = useState(false);
  const error = useSelector((state: Store) => state.resetPassword.error) || '';
  const status = useSelector(
    (state: Store) => state.resetPassword.data?.status
  );
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
          isBarcode: !!barcode,
        })
      );
    }
  };

  const handleAppRedirection = () => {
    if (osName === OsTypes.Android) {
      const playstoreUrl =
        'intent://shorefreight.barcode.com/#Intent;scheme=https;package=com.shorefreight.barcode;end';

      window.location.replace(playstoreUrl);
    } else if (osName === OsTypes.IOS) {
      const localUrl = 'shorefreight.barcode://';
      const appStoreUrl =
        'https://apps.apple.com/ph/app/shorefreight-barcode-scanner/id1613104213';

      window.location.replace(localUrl);

      new Promise<void>((resolve) => {
        setTimeout(() => {
          window.location.replace(appStoreUrl);
          resolve();
        }, 10000);
      });
    } else {
      setNoAppFound(true);

      new Promise<void>((resolve) => {
        setTimeout(() => {
          setNoAppFound(false);
          resolve();
        }, 20000);
      });
    }
  };

  const handleWebLoginRedirection = () => {
    // if (user.type === 'seller') {
    //   history.push(SELLER_ROUTES.LOGIN);
    // } else {
    //   history.push(BUYER_ROUTES.LOGIN);
    // }

    history.push(MAIN_ROUTES.LANDING);
  };

  useEffect(() => {
    if (pending === false && status === 200 && isTriggered) {
      if (barcode) {
        handleAppRedirection();
      } else {
        handleWebLoginRedirection();
      }
    }
  }, [pending, status, isTriggered]);

  const generatedProps = {
    // generated props here
    pending,
    isError,
    savePassword,
    noAppFound,
  };
  return <ResetPasswordView {...generatedProps} />;
};

export default ResetPassword;
