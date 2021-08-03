import {
  CategoryStatus,
  GetNotificationsSettingsResponse,
  SpecificNotificationSettingItem,
} from 'types/store/GetNotificationSettingsState';

export interface NotificationsSettingsProps {
  globalSettings?: {
    sms: CategoryStatus;
    browser: CategoryStatus;
    email: CategoryStatus;
  };
  groupedNotifSettings: Record<string, SpecificNotificationSettingItem[]>;

  handleGlobalToggle: (key: string) => void;
}
