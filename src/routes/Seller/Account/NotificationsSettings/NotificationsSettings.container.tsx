import React, { useEffect, useState } from 'react';

import { push } from 'connected-react-router';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import qs from 'qs';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  getNotificationsSettingsActions,
  updateNotificationSettingsActions,
} from 'store/actions';
import {
  CustomSettingKey,
  CustomSettingKeyType,
  GlobalNotificationsSettingsResponse,
  NotificationSettingItem,
  SpecificNotificationSettingItem,
} from 'types/store/GetNotificationSettingsState';
import { Store } from 'types/store/Store';

import { QueryParams } from '../EditAddress/EditAddress.props';
import { NotificationsSettingsProps } from './NotificationsSettings.props';
import { toNotificationResourceGroup } from './NotificationsSettings.transform';
import NotificationsSettingsView from './NotificationsSettings.view';

const NotificationsSettings = (): JSX.Element => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [companyId, setCompanyId] = useState('');
  const [settingsUpdated, setSettingsUpdated] = useState(false);
  const [updateTriggered, setUpdateTriggered] = useState<null | any>(null);
  const [currentCustomSetting, setCurrentCustomSetting] = useState<null | {
    item: NotificationSettingItem;
    option: CustomSettingKey;
    val: boolean;
    deactivationWarning: string | null;
  }>(null);
  const [currentGlobalSetting, setCurrentGlobalSetting] = useState('');
  const [showDeactivationWarning, setShowDeactivationWarning] = useState('');
  const [globalUpdateTriggered, setGlobalUpdateTriggered] = useState<
    null | 'mobile' | 'push' | 'email' | 'whatsapp'
  >(null);
  const [globalSettings, setGlobalSettings] = useState<
    GlobalNotificationsSettingsResponse
  >({
    push: false,
    mobile: false,
    email: false,
    whatsapp: false,
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

  const handleOnSaveCustom = (val: any) => {
    if (!settingsUpdated) {
      setSettingsUpdated(true);
    }
    dispatch(updateNotificationSettingsActions.request(val));
  };

  const handleOnSaveGlobal = (
    key: 'email' | 'mobile' | 'push' | 'whatsapp'
  ) => {
    if (!settingsUpdated) {
      setSettingsUpdated(true);
    }
    dispatch(
      updateNotificationSettingsActions.request({
        global: { [key]: globalSettings[key] },
      })
    );
  };

  const handleGlobalToggle = (key: string) => {
    if (
      key === 'mobile' ||
      key === 'email' ||
      key === 'push' ||
      key === 'whatsapp'
    ) {
      console.log(key);
      setGlobalSettings({
        ...globalSettings,
        [key]: !globalSettings[key],
      });
      setGlobalUpdateTriggered(key);
    }
  };

  const handleCustomSettingUpdate = () => {
    if (currentCustomSetting) {
      setCustomSettings(
        customSettings.map((c) => {
          const idx = currentCustomSetting.item.notificationIds.indexOf(c.id);
          if (idx > -1) {
            return {
              ...c,
              settings: {
                ...c.settings,
                [currentCustomSetting.option]: {
                  supported: c.settings[currentCustomSetting.option].supported,
                  enabled: currentCustomSetting.val,
                },
              },
            };
          }
          return c;
        })
      );
      setUpdateTriggered({
        custom: currentCustomSetting.item.notificationIds.reduce(
          (acc: { [key: string]: any }, curr) => (
            (acc[curr] = {
              [currentCustomSetting.option]: currentCustomSetting.val,
            }),
            acc
          ),
          {}
        ), //or use acc:any
      });
    }
    setCurrentCustomSetting(null);
    setShowDeactivationWarning('');
    // find idx
  };

  const groupedNotifSettings = toNotificationResourceGroup(
    customSettings || []
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

  useEffect(() => {
    if (updateTriggered && customSettings) {
      handleOnSaveCustom(updateTriggered);
      setUpdateTriggered(null);
    }
  }, [customSettings, updateTriggered]);

  useEffect(() => {
    if (globalUpdateTriggered) {
      handleOnSaveGlobal(globalUpdateTriggered);
      setGlobalUpdateTriggered(null);
      setCurrentGlobalSetting('');
      setShowDeactivationWarning('');
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

  useEffect(() => {
    if (currentCustomSetting !== null) {
      const totalEnabled = Object.keys(
        currentCustomSetting.item.settings
      ).reduce((accum: number, key: string) => {
        if (
          currentCustomSetting.item.settings[key as CustomSettingKeyType]
            .enabled &&
          key !== 'inapp'
        ) {
          return accum + 1;
        }
        return accum;
      }, 0);
      if (
        currentCustomSetting.deactivationWarning !== null &&
        currentCustomSetting.val === false &&
        totalEnabled === 1
      ) {
        setShowDeactivationWarning(currentCustomSetting.deactivationWarning);
      } else {
        handleCustomSettingUpdate();
      }
    }
  }, [currentCustomSetting, showDeactivationWarning]);

  const generatedProps: NotificationsSettingsProps = {
    globalSettings,
    handleGlobalToggle,
    groupedNotifSettings,
    email: getUser?.data?.user.email || '',
    contactNo: getUser?.data?.user.mobile || '',
    loading: getPendingNotificationsSettings && !settingsUpdated,
    handleCustomSettingUpdate,
    setShowDeactivationWarning,
    showDeactivationWarning,
    currentCustomSetting,
    setCurrentCustomSetting,
    currentGlobalSetting,
    setCurrentGlobalSetting,
  };

  return <NotificationsSettingsView {...generatedProps} />;
};

export default NotificationsSettings;
