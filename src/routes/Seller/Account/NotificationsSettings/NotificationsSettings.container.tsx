import React, { useEffect, useState } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import qs from 'qs';
import { groupBy } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getNotificationsSettingsActions } from 'store/actions';
import {
  GlobalNotificationsSettingsResponse,
  SpecificNotificationSettingItem,
} from 'types/store/GetNotificationSettingsState';
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
    push: { enabled: false, supported: false },
    mobile: { enabled: false, supported: false },
    email: { enabled: false, supported: false },
  });
  const getNotificationsSettings = useSelector(
    (state: Store) => state.getNotificationsSettings.data
  );

  const getPendingNotificationsSettings = useSelector(
    (state: Store) => state.getNotificationsSettings.pending || false
  );

  console.log(getNotificationsSettings?.data);

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

  const handleGlobalToggle = (key: string) => {
    if (key === 'mobile' || key === 'email' || key === 'push') {
      setGlobalSettings({
        ...globalSettings,
        [key]: {
          ...globalSettings[key],
          enabled: !globalSettings[key].enabled,
        },
      });
    }
  };

  useEffect(() => {
    console.log(getNotificationsSettings?.data);
    if (getNotificationsSettings && getNotificationsSettings.data) {
      console.log(getNotificationsSettings.data);
      setGlobalSettings(getNotificationsSettings.data.global);
    }
  }, [
    getNotificationsSettings,
    getNotificationsSettings?.data,
    getNotificationsSettings?.data,
  ]);

  const groupNotifsByResource = groupBy(
    (specificNotifItem: SpecificNotificationSettingItem) =>
      specificNotifItem.resource
  );

  const groupedNotifSettings = groupNotifsByResource(
    getNotificationsSettings?.data.custom || []
  );

  const generatedProps: NotificationsSettingsProps = {
    globalSettings,
    handleGlobalToggle,
    groupedNotifSettings,
    loading: getPendingNotificationsSettings,
  };

  return <NotificationsSettingsView {...generatedProps} />;
};

export default NotificationsSettings;
