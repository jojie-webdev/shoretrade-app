import {
  CategoryStatus,
  SpecificNotificationSettingItem,
} from 'types/store/GetNotificationSettingsState';

export interface NotificationsSettingsProps {
  globalSettings?: {
    mobile: CategoryStatus;
    push: CategoryStatus;
    email: CategoryStatus;
  };
  groupedNotifSettings: Record<string, SpecificNotificationSettingItem[]>;
  loading: boolean;
  handleOnSave: () => void;
  handleGlobalToggle: (key: string) => void;
}
