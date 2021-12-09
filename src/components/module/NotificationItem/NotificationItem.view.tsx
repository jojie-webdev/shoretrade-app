/* eslint-disable react/prop-types */
import React from 'react';

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
import moment from 'moment';
import { Link } from 'react-router-dom';
import useComponentVisible from 'utils/Hooks/useComponentVisible';
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

  const { onMarkasRead, onDelete } = props;

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
      <Typography
        className="text"
        weight="900"
        color="primary"
        variant="overlineSmall"
      >
        New
      </Typography>
    </NewIndicatorContainer>
  );
};

const NotificationItem = (props: NotificationItemProps): JSX.Element => {
  const theme = useTheme();
  const {
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
  const defaultColor = isSeller ? 'noshade' : 'shade7';
  const iconColor = isSeller ? theme.grey.shade7 : theme.grey.shade6;
  const notifsRoute =
    theme.appType === 'buyer'
      ? BUYER_ROUTES.NOTIFICATIONS
      : SELLER_ROUTES.NOTIFICATIONS;

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
          <Typography
            variant="caption"
            color={defaultColor}
            className="content"
          >
            {ellipsisOnOverflow(content, 90)}
          </Typography>
          <Link
            onClick={(e) => {
              e.stopPropagation();
              handleNotifOnClick();
            }}
            to={notifsRoute + '?tab=Unread'}
          >
            {content.length > 90 && (
              <Typography
                weight="700"
                variant="caption"
                className="see-more-link-text"
                color="primary"
              >
                see more
              </Typography>
            )}
          </Link>
        </>
      );
    }
    return (
      <Typography color={defaultColor} variant="caption" className="content">
        {content}
      </Typography>
    );
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
          color={isSeller ? 'noshade' : 'shade9'}
          variant="label"
        >
          {name}
        </Typography>

        {measuredTextContent()}

        <Typography color="shade6" variant="small">
          {moment(date).format('MMM DD, YYYY - HH:mm')}
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
