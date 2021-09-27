import React from 'react';

import { Cog, Crab } from 'components/base/SVG';
import Tab from 'components/base/Tab';
import EmptyStateView from 'components/module/EmptyState';
import NotificationItemView from 'components/module/NotificationItem';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import qs from 'qs';
import { Link } from 'react-router-dom';
import { NotificationType } from 'types/store/GetNotificationsState';
import { useTheme } from 'utils/Theme';

import { NotificationsGeneratedProps } from './Notifications.props';
import { Container, TopBarContainer } from './Notifications.style';

const NotificationsView = (props: NotificationsGeneratedProps) => {
  const theme = useTheme();
  const {
    tabItems,
    handleSelectTab,
    activeTab,
    notifsData,
    totalNotifs,
    totalUnreadNotifs,
    handleMarkasRead,
    handleOnDelete,
    handleNotifOnClick,
    currentCompany,
  } = props;
  const isSeller = theme.appType === 'seller';
  const defaultColor = isSeller ? 'shade2' : 'shade6';
  return (
    <Container>
      <TopBarContainer>
        <Tab
          active={activeTab}
          items={tabItems}
          handleSelect={(i) => handleSelectTab(i)}
        />
        <Link
          to={`${SELLER_ACCOUNT_ROUTES.NOTIFICATIONS_SETTINGS}${qs.stringify(
            { companyId: currentCompany?.id },
            { addQueryPrefix: true }
          )}`}
        >
          <Cog />
        </Link>
      </TopBarContainer>
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
            handleNotifOnClick={() =>
              handleNotifOnClick(nd.resource, theme.appType, nd.name)
            }
            key={nd.id}
            fullView
            onMarkasRead={() => handleMarkasRead(nd.id)}
            onDelete={() => handleOnDelete(nd.id)}
            type={nd.resource.toLocaleLowerCase() as NotificationType}
            content={nd.description}
            date={nd.created_at}
            isRead={nd.read_at != null}
            name={nd.name}
          />
        ))}
      {activeTab === 0 && totalNotifs < 1 && (
        <EmptyStateView
          fluid
          Svg={Crab}
          title="No notifications at the moment."
        />
      )}
      {activeTab === 1 && totalUnreadNotifs < 1 && (
        <EmptyStateView fluid Svg={Crab} title="No Unread Notifications" />
      )}
    </Container>
  );
};

export default NotificationsView;
