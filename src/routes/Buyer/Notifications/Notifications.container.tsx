import React, { useState } from 'react';

import { TabItem } from 'components/base/Tab/Tab.props';
import { BUYER_ACCOUNT_ROUTES, BUYER_ROUTES } from 'consts';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import {
  deleteNotificationActions,
  readNotificationActions,
} from 'store/actions';
import { NotificationType, NotifName } from 'types/store/GetNotificationsState';
import { Store } from 'types/store/Store';
import { notifURLMapper } from 'utils/Notification';

import NotificationsView from './Notifications.view';

const Notifications = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  const getNotifications = useSelector(
    (state: Store) => state.getNotifications
  );

  const { search = '' } = useLocation();
  const tabItems: TabItem[] = [
    {
      key: 0,
      title: 'All',
    },
    {
      key: 1,
      title: 'Unread',
    },
  ];
  const initSelectTab =
    tabItems.find((t: { key: number; title: string }) =>
      search.includes(t.title)
    )?.key || tabItems[0].key;

  const [activeTab, setActiveTab] = useState(initSelectTab);
  const notifsData = getNotifications.data?.data?.notifications || [];
  const totalUnreadNotifs = getNotifications?.data?.data.unread || 0;
  const totalNotifs = getNotifications.data?.data?.total || 0;

  const handleMarkasRead = (notificationId: string) => {
    dispatch(readNotificationActions.request({ id: notificationId }));
  };

  const handleOnDelete = (notificationId: string) => {
    dispatch(deleteNotificationActions.request({ id: notificationId }));
  };

  const handleSelectTab = (key: number) => {
    history.push(`${BUYER_ROUTES.NOTIFICATIONS}?tab=${tabItems[key].title}`);
    setActiveTab(key);
  };

  const handleNotifOnClick = (
    resource: NotificationType,
    appType: 'seller' | 'buyer',
    name?: NotifName
  ) => {
    const url = notifURLMapper(resource, appType, name);
    if (url != '') {
      history.push(url);
    }
  };

  const generatedProps = {
    tabItems,
    activeTab,
    handleSelectTab,
    notifsData,
    totalUnreadNotifs,
    totalNotifs,
    handleMarkasRead,
    handleOnDelete,
    handleNotifOnClick,
  };

  return <NotificationsView {...generatedProps} />;
};

export default Notifications;
