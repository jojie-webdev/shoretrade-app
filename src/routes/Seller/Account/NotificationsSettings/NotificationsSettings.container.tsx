import React, { useEffect, useState } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getNotificationsSettingsActions } from 'store/actions';
import { GlobalNotificationsSettingsResponse } from 'types/store/GetNotificationSettingsState';
import { Store } from 'types/store/Store';

import { QueryParams } from '../EditAddress/EditAddress.props';
import { NotificationsSettingsProps } from './NotificationsSettings.props';
import NotificationsSettingsView from './NotificationsSettings.view';

const NotificationsSettings = (): JSX.Element => {
  // TODO Setup redux for container

  const dispatch = useDispatch();
  const location = useLocation();
  const [companyId, setCompanyId] = useState('');
  const [globalSettings, setGlobalSettings] = useState<
    GlobalNotificationsSettingsResponse
  >({
    browser: { enabled: false, supported: false },
    sms: { enabled: false, supported: false },
    email: { enabled: false, supported: false },
  });
  const getNotificationsSettings = useSelector(
    (state: Store) => state.getNotificationsSettings.data
  );

  console.log(getNotificationsSettings?.data.data);

  useEffect(() => {
    const { companyId } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    }) as QueryParams;

    if (!companyId) {
      dispatch(push(SELLER_ACCOUNT_ROUTES.LANDING));
    }

    setCompanyId(companyId);
  }, []);

  useEffect(() => {
    if (companyId) {
      dispatch(
        getNotificationsSettingsActions.request({
          companyId,
        })
      );
    }
  }, [companyId]);

  const handleGlobalToggle = (obj: any) => {
    console.log(obj);
    if (obj === 'sms') {
      setGlobalSettings({
        ...globalSettings,
        sms: { ...globalSettings.sms, enabled: !globalSettings.sms.enabled },
      });
    }
  };

  useEffect(() => {
    console.log(getNotificationsSettings?.data);
    if (getNotificationsSettings && getNotificationsSettings.data) {
      console.log(getNotificationsSettings.data);
      setGlobalSettings(getNotificationsSettings.data.data.globalSettings);
    }
  }, [
    getNotificationsSettings,
    getNotificationsSettings?.data,
    getNotificationsSettings?.data,
  ]);

  const generatedProps: NotificationsSettingsProps = {
    globalSettings,
    handleGlobalToggle,
  };

  return <NotificationsSettingsView {...generatedProps} />;
};

export default NotificationsSettings;
