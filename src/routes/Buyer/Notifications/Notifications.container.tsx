import React, { useState } from 'react';

import { TabItem } from 'components/base/Tab/Tab.props';
import { useSelector } from 'react-redux';
import { Store } from 'types/store/Store';

import NotificationsView from './Notifications.view';

const Notifications = (): JSX.Element => {
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
  const generatedProps = {
    tabItems,
    activeTab,
    setActiveTab,
    notifsData,
    totalUnreadNotifs,
    totalNotifs,
  };

  return <NotificationsView {...generatedProps} />;
};

export default Notifications;
