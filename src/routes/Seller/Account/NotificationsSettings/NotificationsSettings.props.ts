import {
  CategoryStatus,
  GetNotificationsSettingsResponse,
} from 'types/store/GetNotificationSettingsState';

export interface NotificationsSettingsProps {
  globalSettings?: {
    sms: CategoryStatus;
    browser: CategoryStatus;
    email: CategoryStatus;
  };
}
