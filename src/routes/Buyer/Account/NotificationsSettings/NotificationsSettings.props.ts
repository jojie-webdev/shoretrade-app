import {
  CategoryStatus,
  SpecificNotificationSettingItem,
} from 'types/store/GetNotificationSettingsState';

export interface NotificationsSettingsProps {
  globalSettings?: {
    mobile: boolean;
    push: boolean;
    email: boolean;
  };
  groupedNotifSettings: Record<string, SpecificNotificationSettingItem[]>;
  loading: boolean;
  handleGlobalToggle: (key: string) => void;
  handleCustomSettingUpdate: (item: SpecificNotificationSettingItem) => void;
}
