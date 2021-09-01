import React, { useState } from 'react';

// eslint-disable-next-line import/order
import {
  Account,
  Anchor,
  CheckCircle,
  DashboardAlt as ListingsIcon,
  FolderDownload,
  MarketRequests,
  More,
  Orders,
  Star,
} from 'components/base/SVG';

// import { useTheme } from 'utils/Theme';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { BUYER_ROUTES, SELLER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';
import { Link, useHistory } from 'react-router-dom';
import useComponentVisible from 'utils/Hooks/useComponentVisible';
import { notifURLMapper } from 'utils/Notification';
import { ellipsisOnOverflow } from 'utils/String/ellipsisOnOverflow';
import { useTheme } from 'utils/Theme';

import {
  NotificationItemProps,
  NotifAvatarProps,
} from './NotificationItem.props';
import {
  Container,
  NotifAvatarContainer,
  NewIndicatorContainer,
  MoreMenuContainer,
  DropdownItemContainer,
  RightComponentContainer,
} from './NotificationItem.style';

const MoreMenu = (props: {
  fullView?: boolean;
  notifsRoute: string;
  onMarkasRead: () => void;
  onDelete: () => void;
}) => {
  const {
    ref,
    isComponentVisible,
    setIsComponentVisible,
  } = useComponentVisible(false);

  const history = useHistory();
  const { fullView, notifsRoute, onMarkasRead, onDelete } = props;

  const handlePress = () => {
    setIsComponentVisible(!isComponentVisible);
  };
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const defaultColor = isSeller ? 'noshade' : 'shade9';

  return (
    <MoreMenuContainer ref={ref} isOpen={isComponentVisible}>
      <div className="more-container">
        <Touchable onPress={() => handlePress()}>
          <More />
        </Touchable>
        <div className="dropdown-container">
          <div className="dropdown-menu">
            <div className="dropdown-header">
              <span className="triangle"></span>
            </div>
            <div className="dropdown-body">
              <div className="dropdown-content">
                <DropdownItemContainer>
                  <Touchable onPress={() => onMarkasRead()}>
                    <CheckCircle />
                    <Typography className="text" color={defaultColor}>
                      Mark as Read
                    </Typography>
                  </Touchable>
                </DropdownItemContainer>
                <DropdownItemContainer>
                  <Touchable onPress={() => onDelete()}>
                    <FolderDownload />
                    <Typography className="text" color={defaultColor}>
                      Delete Notification
                    </Typography>
                  </Touchable>
                </DropdownItemContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MoreMenuContainer>
  );
};

const NewIndicator = () => {
  return (
    <NewIndicatorContainer>
      <div className="dot"></div>
      <Typography weight="900" color="primary" variant="overlineSmall">
        New
      </Typography>
    </NewIndicatorContainer>
  );
};

const NotificationItem = (props: NotificationItemProps): JSX.Element => {
  const theme = useTheme();
  const {
    type,
    name,
    isRead,
    content,
    date,
    fullView,
    onMarkasRead,
    onDelete,
    handleNotifOnClick,
  } = props;
  const isSeller = theme.appType === 'seller';
  const defaultColor = isSeller ? 'noshade' : 'shade9';
  const history = useHistory();
  const iconColor = isSeller ? theme.grey.shade7 : theme.grey.shade6;
  const notifsRoute =
    theme.appType === 'buyer'
      ? BUYER_ROUTES.NOTIFICATIONS
      : SELLER_ROUTES.NOTIFICATIONS;
  const isMobile = useMediaQuery({
    query: BREAKPOINTS.sm,
  });

  const NotifAvatar = (props: NotifAvatarProps) => {
    let icon: JSX.Element;
    const defaulAvatarProps = {
      width: 24,
      height: 24,
      fill: iconColor,
    };
    switch (props.type) {
      case 'account':
        icon = <Account {...defaulAvatarProps} />;
        break;
      case 'inactivity':
        icon = <Account {...defaulAvatarProps} />;
        break;
      case 'market_requests':
        icon = <MarketRequests {...defaulAvatarProps} />;
        break;
      case 'market_board':
        icon = <MarketRequests {...defaulAvatarProps} />;
        break;
      case 'ordering':
        icon = <Orders {...defaulAvatarProps} />;
        break;
      case 'orders':
        icon = <Orders {...defaulAvatarProps} />;
        break;
      case 'rating_favourite':
        icon = <Star {...defaulAvatarProps} />;
        break;
      case 'aquafutures':
        icon = <Anchor {...defaulAvatarProps} />;
        break;
      case 'listings':
        icon = <ListingsIcon {...defaulAvatarProps} />;
        break;
      default:
        icon = <Account {...defaulAvatarProps} />;
    }
    return <NotifAvatarContainer>{icon}</NotifAvatarContainer>;
  };

  const measuredTextContent = () => {
    // if (isMobile) {
    //   return ellipsisOnOverflow(content, 50);
    // }
    if (!fullView) {
      return (
        <>
          <Typography>{ellipsisOnOverflow(content, 70)}</Typography>
          <Link
            onClick={(e) => {
              e.stopPropagation();
              handleNotifOnClick();
            }}
            to={notifsRoute + '?tab=Unread'}
          >
            <Typography color="info">See More</Typography>
          </Link>
        </>
      );
    }
    return <Typography>{content}</Typography>;
  };

  return (
    <Container
      onClick={(e) => {
        e.stopPropagation();
        onMarkasRead();
        handleNotifOnClick();
      }}
      isRead={isRead}
      fullView={fullView}
    >
      <div className="horizontal-style-container" />
      <NotifAvatar type={props.type} />
      <div className="content-container">
        <Typography
          weight="900"
          color={isRead ? 'shade7' : 'primary'}
          variant="overlineSmall"
        >
          {name}
        </Typography>

        {measuredTextContent()}

        <Typography color="shade6" variant="caption">
          {moment(date).format('MM/DD/YYYY - HH:mm')}
        </Typography>
      </div>
      <RightComponentContainer>
        {!isRead && <NewIndicator />}
        <MoreMenu
          onDelete={onDelete}
          onMarkasRead={onMarkasRead}
          notifsRoute={notifsRoute}
          fullView={fullView}
        />
      </RightComponentContainer>
    </Container>
  );
};

export default React.memo(NotificationItem);
