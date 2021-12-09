import { groupBy } from 'ramda';
import {
  SettingsToggleItem,
  SettingsUpdateItem,
  SpecificNotificationSettingItem,
  NotificationResourceGroup,
  NotificationSettingItem,
} from 'types/store/GetNotificationSettingsState';
import { capitalize } from 'utils/String';

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

const groupByResource: any = groupBy(
  (data: SpecificNotificationSettingItem) => data.resource
);

const groupBySubgroup = groupBy(
  (data: SpecificNotificationSettingItem) => data.subgroup || data.name
);

export const toNotificationResourceGroup = (
  data: SpecificNotificationSettingItem[]
): NotificationResourceGroup[] => {
  const resourceGroup = groupByResource(data);
  const resourceGroupArray: NotificationResourceGroup[] = Object.keys(
    resourceGroup
  ).reduce(
    (
      accumA: {
        resource: string;
        items: NotificationSettingItem[];
      }[],
      keyA: string
    ) => {
      const groupedItems = groupBySubgroup(resourceGroup[keyA]);
      const items = Object.keys(groupedItems).reduce(
        (accumB: NotificationSettingItem[], keyB: string) => {
          return [
            ...accumB,
            {
              title: keyB,
              notificationIds: groupedItems[keyB].map((a) => a.id),
              settings: groupedItems[keyB][0].settings, // override other settings
              deactivationWarning: groupedItems[keyB][0].deactivationWarning,
              description: groupedItems[keyB][0].description,
            },
          ];
        },
        []
      );
      return [
        ...accumA,
        {
          resource: keyA.split('_').map(capitalize).join(' '),
          items,
        },
      ];
    },
    []
  );

  return resourceGroupArray;
};
