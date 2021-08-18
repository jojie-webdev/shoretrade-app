import React from 'react';

import { Crab } from 'components/base/SVG';
import Tab from 'components/base/Tab';
import EmptyStateView from 'components/module/EmptyState';
import NotificationItemView from 'components/module/NotificationItem';
import { useTheme } from 'utils/Theme';

import { NotificationsGeneratedProps } from './Notifications.props';
import { Container } from './Notifications.style';

const NotificationsView = (props: NotificationsGeneratedProps) => {
  const theme = useTheme();
  const {
    tabItems,
    setActiveTab,
    activeTab,
    notifsData,
    totalNotifs,
    totalUnreadNotifs,
    handleMarkasRead,
    handleOnDelete,
  } = props;
  const isSeller = theme.appType === 'seller';
  const defaultColor = isSeller ? 'shade2' : 'shade6';
  return (
    <Container>
      <Tab
        active={activeTab}
        items={tabItems}
        handleSelect={(i) => setActiveTab(i)}
      ></Tab>
      {notifsData
        .filter((nd) => {
          if (activeTab === 1) {
            if (nd.read_at === null) {
              return nd;
            } else {
              return null;
            }
          }
          return nd;
        })
        .map((nd) => (
          <NotificationItemView
            key={nd.id}
            fullView
            onMarkasRead={() => handleMarkasRead(nd.id)}
            onDelete={() => handleOnDelete(nd.id)}
            type="account"
            content={nd.description}
            date={nd.created_at}
            isRead={nd.read_at != null}
          />
        ))}
      {notifsData.length < 1 && (
        <EmptyStateView Svg={Crab} title="No notifications at the moment." />
      )}
    </Container>
  );
};

export default NotificationsView;
