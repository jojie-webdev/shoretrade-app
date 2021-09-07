import React, { useState, useEffect } from 'react';

import Button from 'components/base/Button';
import { Bell, Crab, Octopus } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { BUYER_ROUTES, SELLER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { NotificationType, NotifName } from 'types/store/GetNotificationsState';
import useComponentVisible from 'utils/Hooks/useComponentVisible';
import { useTheme } from 'utils/Theme';

// import { useTheme } from 'utils/Theme';
import EmptyStateView from '../EmptyState';
import NotificationItem from '../NotificationItem';
import { NotificationMenuProps } from './NotificationMenu.props';
import {
  Container,
  NotifCount,
  DropdownItemContainer,
} from './NotificationMenu.style';

const NotificationMenu = (props: NotificationMenuProps): JSX.Element => {
  const theme = useTheme();
  const history = useHistory();
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);
  const isSeller = theme.appType === 'seller';
  const notifsRoute =
    theme.appType === 'buyer'
      ? BUYER_ROUTES.NOTIFICATIONS
      : SELLER_ROUTES.NOTIFICATIONS;

  const {
    notifTotal,
    unreadTotal,
    notifsData,
    handleMarkasRead,
    handleOnDelete,
    handleNotifOnClick,
  } = props;

  const isNonDesktop = useMediaQuery({
    query: BREAKPOINTS.nonDesktop,
  });

  const handleBellClick = () => {
    if (isNonDesktop) {
      history.push(notifsRoute);
    } else {
      setIsComponentVisible(!isComponentVisible);
    }
  };

  const onNotifClick = (
    resource: NotificationType,
    appType: 'buyer' | 'seller',
    name?: NotifName
  ) => {
    handleNotifOnClick(resource, appType, name);
    setIsComponentVisible(!isComponentVisible);
  };

  const bellColor = () => {
    if (isNonDesktop) {
      return theme.grey.noshade;
    } else if (isSeller) {
      return theme.grey.noshade;
    }
    return theme.grey.shade9;
  };

  const handleOnClickSeeAll = () => {
    setIsComponentVisible(false);
    history.push(notifsRoute + '?tab=Unread');
  };

  return (
    <Container ref={ref} isOpenMenu={isComponentVisible}>
      <div className="icon-wrapper">
        <Touchable onPress={() => handleBellClick()}>
          <Bell fill={bellColor()} />
          {unreadTotal > 0 && (
            <NotifCount>
              <Typography color="noshade" variant="small" weight="900">
                {unreadTotal}
              </Typography>
            </NotifCount>
          )}
        </Touchable>

        <div className="menu-container">
          <div className="notif-menu">
            <div className="menu-header">
              <span className="triangle"></span>
            </div>
            <div className="menu-body">
              <div className="menu-content">
                {notifsData
                  .filter((nd) => {
                    if (nd.read_at === null) {
                      return nd;
                    }
                    return null;
                  })
                  .slice(0, 3)
                  .map((nd) => (
                    <DropdownItemContainer key={nd.id}>
                      <NotificationItem
                        handleNotifOnClick={() =>
                          onNotifClick(nd.resource, theme.appType, nd.name)
                        }
                        onDelete={() => handleOnDelete(nd.id)}
                        onMarkasRead={() => handleMarkasRead(nd.id)}
                        type={
                          nd.resource.toLocaleLowerCase() as NotificationType
                        }
                        content={nd.description}
                        date={nd.created_at}
                        isRead={nd.read_at !== null}
                        name={nd.name}
                      />
                    </DropdownItemContainer>
                  ))}
                {notifsData.length < 1 && (
                  <EmptyStateView
                    Svg={Octopus}
                    fluid
                    height={90}
                    title="No notifications at the moment."
                  />
                )}
              </div>
              <div className="menu-footer">
                {notifsData.length > 0 && (
                  <Button
                    onClick={() => handleOnClickSeeAll()}
                    size="sm"
                    variant="outline"
                    text="See All"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default React.memo(NotificationMenu);
