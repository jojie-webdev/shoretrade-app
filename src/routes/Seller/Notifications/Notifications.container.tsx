import React, { useState } from 'react';

import { TabItem } from 'components/base/Tab/Tab.props';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteNotificationActions,
  readNotificationActions,
} from 'store/actions';
import { Store } from 'types/store/Store';

import NotificationsView from './Notifications.view';

const Notifications = (): JSX.Element => {
  const dispatch = useDispatch();
  const getNotifications = useSelector(
    (state: Store) => state.getNotifications
  );

  const tabItems: TabItem[] = [
    {
      key: 0,
      title: 'All',
    },
    {
      key: 1,
      title: 'Unread',
    },
    {
      key: 3,
      title: 'Archive',
    },
  ];
  const [activeTab, setActiveTab] = useState(tabItems[0].key);
  const notifsData = getNotifications.data?.data?.notifications || [];
  const totalUnreadNotifs = getNotifications?.data?.data.unread || 0;
  const totalNotifs = getNotifications.data?.data?.total || 0;

  const handleMarkasRead = (notificationId: string) => {
    dispatch(readNotificationActions.request({ id: notificationId }));
  };

  const handleOnDelete = (notificationId: string) => {
    dispatch(deleteNotificationActions.request({ id: notificationId }));
  };

  const generatedProps = {
    tabItems,
    activeTab,
    setActiveTab,
    notifsData,
    totalUnreadNotifs,
    totalNotifs,
    handleMarkasRead,
    handleOnDelete,
  };

  return <NotificationsView {...generatedProps} />;
};

export default Notifications;
