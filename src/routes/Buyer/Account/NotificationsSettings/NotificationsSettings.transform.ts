import moment from 'moment';
import {
  SettingsToggleItem,
  SettingsUpdateItem,
  SpecificNotificationSettingItem,
} from 'types/store/GetNotificationSettingsState';

// export const shipmentModeToString = (shipmentMode: string) => {
//   if (shipmentMode.indexOf('ROAD') !== -1) {
//     return 'Road freight';
//   }
//   if (shipmentMode.indexOf('AIR') !== -1 || shipmentMode.indexOf('VA') !== -1) {
//     return 'Air freight';
//   }
//   return 'Road freight';
// };
export const toUpdateSettingItem = (
  custom: SettingsToggleItem
): SettingsUpdateItem => {
  return {
    push: custom.push.enabled,
    mobile: custom.mobile.enabled,
    email: custom.email.enabled,
    inapp: custom.inapp.enabled,
  };
};

export const toUpdateNotification = (
  data: SpecificNotificationSettingItem[]
): Record<
  string,
  {
    inapp?: boolean;

    mobile?: boolean;

    email?: boolean;

    push?: boolean;
  }
> => {
  return data.reduce((accum, current) => {
    return {
      ...accum,

      [current.id]: {
        inapp: current.settings.inapp.enabled,
        mobile: current.settings.mobile.enabled,
        email: current.settings.email.enabled,
        push: current.settings.push.enabled,
      },
    };
  }, {});
};
