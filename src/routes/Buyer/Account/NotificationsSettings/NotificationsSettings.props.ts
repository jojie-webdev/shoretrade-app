import {
  CategoryStatus,
  CustomSettingKey,
  NotificationResourceGroup,
  NotificationSettingItem,
} from 'types/store/GetNotificationSettingsState';

export interface NotificationsSettingsProps {
  globalSettings?: {
    mobile: boolean;
    push: boolean;
    email: boolean;
  };
  groupedNotifSettings: NotificationResourceGroup[];
  loading: boolean;
  handleGlobalToggle: (key: string) => void;
  handleCustomSettingUpdate: (
    item: NotificationSettingItem,
    option: CustomSettingKey,
    val: boolean
  ) => void;
}
