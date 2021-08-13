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
  CustomSettingKey,
  GlobalNotificationsSettingsResponse,
  NotificationSettingItem,
  SpecificNotificationSettingItem,
} from 'types/store/GetNotificationSettingsState';
import { Store } from 'types/store/Store';

import { QueryParams } from '../EditAddress/EditAddress.props';
import { NotificationsSettingsProps } from './NotificationsSettings.props';
import {
  toNotificationResourceGroup,
  toUpdateNotification,
  toUpdateSettingItem,
} from './NotificationsSettings.transform';
import NotificationsSettingsView from './NotificationsSettings.view';
import { userInfo } from 'os';

const NotificationsSettings = (): JSX.Element => {
  // TODO Setup redux for container

  const dispatch = useDispatch();
  const location = useLocation();
  const [companyId, setCompanyId] = useState('');
  const [updateTriggered, setUpdateTriggered] = useState<null | any>(null);
  const [globalUpdateTriggered, setGlobalUpdateTriggered] = useState<
    null | 'mobile' | 'push' | 'email'
  >(null);
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

  const getUser = useSelector((state: Store) => state.getUser.data);

  const pendingUpdate = useSelector(
    (state: Store) => state.updateNotificationSettings.pending || false
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

  const handleOnSaveCustom = (val: any) => {
    dispatch(updateNotificationSettingsActions.request(val));
  };

  const handleOnSaveGlobal = (key: 'email' | 'mobile' | 'push') => {
    dispatch(
      updateNotificationSettingsActions.request({
        global: { [key]: globalSettings[key] },
      })
    );
  };

  const handleGlobalToggle = (key: string) => {
    if (key === 'mobile' || key === 'email' || key === 'push') {
      setGlobalSettings({
        ...globalSettings,
        [key]: !globalSettings[key],
      });
      setGlobalUpdateTriggered(key);
    }
  };

  const handleCustomSettingUpdate = (
    item: NotificationSettingItem,
    option: CustomSettingKey,
    val: boolean
  ) => {
    // find idx
    setCustomSettings(
      customSettings.map((c) => {
        const idx = item.notificationIds.indexOf(c.id);
        if (idx > -1) {
          console.log(idx);
          return {
            ...c,
            settings: {
              ...c.settings,
              [option]: {
                supported: c.settings[option].supported,
                enabled: val,
              },
            },
          };
        }
        return c;
      })
    );
    setUpdateTriggered({
      custom: item.notificationIds.reduce(
        (acc: { [key: string]: any }, curr) => (
          (acc[curr] = { [option]: val }), acc
        ),
        {}
      ), //or use acc:any
    });
  };

  useEffect(() => {
    if (updateTriggered && customSettings) {
      console.log(updateTriggered);
      handleOnSaveCustom(updateTriggered);
      setUpdateTriggered(null);
    }
  }, [customSettings, updateTriggered]);

  useEffect(() => {
    if (globalUpdateTriggered && globalUpdateTriggered) {
      handleOnSaveGlobal(globalUpdateTriggered);
      setGlobalUpdateTriggered(null);
    }
  }, [globalSettings, globalUpdateTriggered]);

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

  // const groupNotifsByResource = groupBy(
  //   (specificNotifItem: SpecificNotificationSettingItem) =>
  //     specificNotifItem.resource
  // );
  // const groupedNotifSettings = groupNotifsByResource(customSettings || []);

  const groupedNotifSettings = toNotificationResourceGroup(
    customSettings || []
  );

  const generatedProps: NotificationsSettingsProps = {
    globalSettings,
    handleGlobalToggle,
    groupedNotifSettings,
    email: getUser?.data?.user.email || '',
    contactNo: getUser?.data?.user.mobile || '',
    loading: getPendingNotificationsSettings,
    handleCustomSettingUpdate,
  };

  return <NotificationsSettingsView {...generatedProps} />;
};

export default NotificationsSettings;
