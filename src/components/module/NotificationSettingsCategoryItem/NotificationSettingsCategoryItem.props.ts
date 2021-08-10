import {
  CategoryStatus,
  SettingsToggleItem,
  SpecificNotificationSettingItem,
} from 'types/store/GetNotificationSettingsState';

export interface NotificationSettingsCategoryItemProps {
  title: string;
  icon?: JSX.Element;
  mobile: CategoryStatus;
  push: CategoryStatus;
  email: CategoryStatus;
  inapp: CategoryStatus;
  onChange: (val: SettingsToggleItem) => void;
}
