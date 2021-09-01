import {
  CategoryStatus,
  CustomSettingKey,
  NotificationResourceGroup,
  NotificationSettingItem,
  SpecificNotificationSettingItem,
} from 'types/store/GetNotificationSettingsState';

export interface NotificationsSettingsProps {
  globalSettings?: {
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
  handleCustomSettingUpdate: (
    item: NotificationSettingItem,
    option: CustomSettingKey,
    val: boolean
  ) => void;
}
