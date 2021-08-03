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
        type="orders"
        content="Test"
        date={moment()}
        isRead={false}
      />
      <NotificationItemView
        fullView
        type="rating-favourite"
        content="Test"
        date={moment()}
        isRead={false}
      />
      <NotificationItemView
        fullView
        type="aquafutures"
        content="Test"
        date={moment()}
        isRead={false}
      />
      <NotificationItemView
        fullView
        type="listings"
        content="Test"
        date={moment()}
        isRead={false}
      />
      <NotificationItemView
        fullView
        type="market-requests"
        content="Test"
        date={moment()}
        isRead={false}
      />
      <NotificationItemView
        fullView
        type="inactivity"
        content="Test"
        date={moment()}
        isRead={true}
      />
    </Container>
  );
};

export default NotificationsView;
