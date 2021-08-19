import React, { useState } from 'react';

import { TabItem } from 'components/base/Tab/Tab.props';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteNotificationActions,
  readNotificationActions,
} from 'store/actions';
import { Store } from 'types/store/Store';

import NotificationsView from './Notifications.view';
import { NotificationType } from 'types/store/GetNotificationsState';
import { notifResourceToURLMapper } from 'utils/Notification';
import { useHistory } from 'react-router-dom';

const Notifications = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
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

  const handleNotifOnClick = (
    resource: NotificationType,
    appType: 'seller' | 'buyer'
  ) => {
    const url = notifResourceToURLMapper(resource, appType);
    if (url != '') {
      history.push(url);
    }
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
    handleNotifOnClick,
  };

  return <NotificationsView {...generatedProps} />;
};

export default Notifications;
