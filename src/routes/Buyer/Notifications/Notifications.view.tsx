import React from 'react';

import Tab from 'components/base/Tab';
import NotificationItemView from 'components/module/NotificationItem';
import moment from 'moment';

// import { useTheme } from 'utils/Theme';
import { NotificationsGeneratedProps } from './Notifications.props';
import { Container } from './Notifications.style';

const NotificationsView = (props: NotificationsGeneratedProps) => {
  // const theme = useTheme();
  const { tabItems, setActiveTab, activeTab } = props;
  return (
    <Container>
      <Tab
        active={activeTab}
        items={tabItems}
        handleSelect={(i) => setActiveTab(i)}
      ></Tab>
      <NotificationItemView
        fullView
        type="account"
        content="Test"
        date={moment()}
        isRead={false}
      />
      <NotificationItemView
        fullView
        type="account"
        content="Test"
        date={moment()}
        isRead={false}
      />
      <NotificationItemView
        fullView
        type="account"
        content="Test"
        date={moment()}
        isRead={false}
      />
    </Container>
  );
};

export default NotificationsView;
