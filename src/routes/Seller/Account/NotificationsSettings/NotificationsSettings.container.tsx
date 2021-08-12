import React, { useEffect, useState } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import qs from 'qs';
import { groupBy } from 'ramda';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  getNotificationsSettingsActions,
  updateNotificationSettingsActions,
} from 'store/actions';
import {
  GlobalNotificationsSettingsResponse,
  SpecificNotificationSettingItem,
} from 'types/store/GetNotificationSettingsState';
import { Store } from 'types/store/Store';

import { QueryParams } from '../EditAddress/EditAddress.props';
import { toUpdateNotification } from './NotificationSettings.transform';
import { NotificationsSettingsProps } from './NotificationsSettings.props';
import NotificationsSettingsView from './NotificationsSettings.view';

const NotificationsSettings = (): JSX.Element => {
  // TODO Setup redux for container

  const dispatch = useDispatch();
  const location = useLocation();
  const [companyId, setCompanyId] = useState('');
  const [updateTriggered, setUpdateTriggered] = useState(false);
  const [globalSettings, setGlobalSettings] = useState<
    GlobalNotificationsSettingsResponse
  >({
    push: false,
    mobile: false,
    email: false,
  });

  const [customSettings, setCustomSettings] = useState<
    SpecificNotificationSettingItem[]
  >([]);
  const getNotificationsSettings = useSelector(
    (state: Store) => state.getNotificationsSettings.data
  );

  const getPendingNotificationsSettings = useSelector(
    (state: Store) => state.getNotificationsSettings.pending || false
  );

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

  const handleOnSave = () => {
    dispatch(
      updateNotificationSettingsActions.request({
        global: globalSettings,
        custom: toUpdateNotification(customSettings),
      })
    );
  };

  const handleGlobalToggle = (key: string) => {
    if (key === 'mobile' || key === 'email' || key === 'push') {
      setGlobalSettings({
        ...globalSettings,
        [key]: !globalSettings[key],
      });
    }
  };

  const handleCustomSettingUpdate = (item: SpecificNotificationSettingItem) => {
    // find idx
    console.log(item);
    setCustomSettings(
      customSettings.map((c) => {
        if (c.id === item.id) {
          return item;
        }
        return c;
      })
    );
    setUpdateTriggered(true);
  };

  useEffect(() => {
    if (updateTriggered && customSettings) {
      handleOnSave();
      setUpdateTriggered(false);
    }
  }, [customSettings, updateTriggered]);

  useEffect(() => {
    if (getNotificationsSettings && getNotificationsSettings.data) {
      if (getNotificationsSettings.data.global) {
        setGlobalSettings(getNotificationsSettings.data.global);
      }
      if (getNotificationsSettings.data.custom) {
        setCustomSettings(getNotificationsSettings.data.custom);
      }
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
  const groupedNotifSettings = groupNotifsByResource(customSettings || []);

  const generatedProps: NotificationsSettingsProps = {
    globalSettings,
    handleGlobalToggle,
    groupedNotifSettings,
    loading: getPendingNotificationsSettings,
    handleOnSave,
    handleCustomSettingUpdate,
  };

  return <NotificationsSettingsView {...generatedProps} />;
};

export default NotificationsSettings;
