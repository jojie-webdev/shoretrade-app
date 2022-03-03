import React from 'react';

import Button from 'components/base/Button';
import { Bell } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { BUYER_ROUTES, SELLER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { NotificationType, NotifName } from 'types/store/GetNotificationsState';
import useComponentVisible from 'utils/Hooks/useComponentVisible';
import { useTheme } from 'utils/Theme';

import NotificationItem from '../NotificationItem';
import { NotificationMenuProps } from './NotificationMenu.props';
import {
  Container,
  NotifCount,
  DropdownItemContainer,
} from './NotificationMenu.style';
import { SpecialColors } from 'utils/SFMTheme';

const NotificationMenu = (props: NotificationMenuProps): JSX.Element => {
  const theme = useTheme();
  const history = useHistory();
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);
  const isSeller = theme.appType === 'seller';
  const defaultColor = isSeller ? 'shade2' : 'shade6';
  const notifsRoute =
    theme.appType === 'buyer'
      ? BUYER_ROUTES.NOTIFICATIONS
      : SELLER_ROUTES.NOTIFICATIONS;

  const {
    unreadTotal,
    notifsData,
    handleMarkasRead,
    handleMarkAllasRead,
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
      if (theme.isSFM && theme.appType === 'buyer') {
        return SpecialColors.blue;
      }
      return theme.grey.noshade;
    } else if (isSeller) {
      return theme.grey.noshade;
    }
    return theme.grey.shade9;
  };

  const handleOnClickSeeAll = () => {
    setIsComponentVisible(false);
    history.push(notifsRoute + '?tab=All');
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
              <Typography
                variant="body"
                style={{ fontSize: '20px' }}
                color={isSeller ? 'noshade' : 'shade9'}
                altFont
              >
                Notifications
              </Typography>
              <Button
                variant="outline"
                textVariant="overline"
                text="Mark all as read"
                size="sm"
                textWeight="900"
                style={{ borderRadius: '8px' }}
                onClick={handleMarkAllasRead}
              />
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
                        name={nd.title || nd.name}
                      />
                    </DropdownItemContainer>
                  ))}
                {unreadTotal < 1 && (
                  <Typography
                    variant="title6"
                    align="center"
                    color={defaultColor}
                  >
                    No Unread Notifications
                  </Typography>
                )}
              </div>
              <div className="menu-footer">
                <Button
                  onClick={() => handleOnClickSeeAll()}
                  size="sm"
                  variant="outline"
                  textVariant="overline"
                  text="See All"
                  textWeight="900"
                  style={{ borderRadius: '8px' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default React.memo(NotificationMenu);
