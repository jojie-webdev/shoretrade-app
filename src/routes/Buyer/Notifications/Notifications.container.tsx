import React, { useState } from 'react';

import { TabItem } from 'components/base/Tab/Tab.props';

import NotificationsView from './Notifications.view';

const Notifications = (): JSX.Element => {
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

  const generatedProps = {
    tabItems,
    activeTab,
    setActiveTab,
  };

  return <NotificationsView {...generatedProps} />;
};

export default Notifications;
