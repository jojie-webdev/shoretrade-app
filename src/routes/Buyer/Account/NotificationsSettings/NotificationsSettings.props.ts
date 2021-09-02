import { Dispatch, SetStateAction } from 'react';

import {
  CategoryStatus,
  CustomSettingKey,
  NotificationResourceGroup,
  NotificationSettingItem,
} from 'types/store/GetNotificationSettingsState';

export interface NotificationsSettingsProps {
  globalSettings: {
    mobile: boolean;
    push: boolean;
    email: boolean;
    whatsapp: boolean;
  };
  email: string;
  contactNo: string;
  groupedNotifSettings: NotificationResourceGroup[];
  loading: boolean;
  handleGlobalToggle: (key: string) => void;
  handleCustomSettingUpdate: () => void;
  showDeactivationWarning: string;
  setShowDeactivationWarning: Dispatch<SetStateAction<string>>;
  currentCustomSetting: null | {
    item: NotificationSettingItem;
    option: CustomSettingKey;
    val: boolean;
    deactivationWarning: string | null;
  };
  setCurrentCustomSetting: Dispatch<
    SetStateAction<null | {
      item: NotificationSettingItem;
      option: CustomSettingKey;
      val: boolean;
      deactivationWarning: string | null;
    }>
  >;
  currentGlobalSetting: string;
  setCurrentGlobalSetting: Dispatch<SetStateAction<string>>;
}
