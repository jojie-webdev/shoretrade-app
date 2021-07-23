import { CategoryStatus } from 'types/store/GetNotificationSettingsState';

export interface NotificationSettingsCategoryItemProps {
  title: string;
  icon?: JSX.Element;
  sms: CategoryStatus;
  browser: CategoryStatus;
  email: CategoryStatus;
}

