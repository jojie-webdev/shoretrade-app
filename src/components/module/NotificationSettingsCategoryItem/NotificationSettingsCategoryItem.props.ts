import {
  CategoryStatus,
  CustomSettingKey,
  SettingsToggleItem,
  SpecificNotificationSettingItem,
} from 'types/store/GetNotificationSettingsState';
import { NotificationType } from 'types/store/GetNotificationsState';

export interface NotificationSettingsCategoryItemProps {
  title: string;
  description: string | null;
  icon?: JSX.Element;
  mobile: CategoryStatus;
  push: CategoryStatus;
  email: CategoryStatus;
  whatsapp: CategoryStatus;
  inapp: CategoryStatus;
  type: NotificationType | string;
  loading?: boolean;
  onChange: (val: boolean, option: CustomSettingKey) => void;
}
