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
import { useHistory } from 'react-router-dom';
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
import moment from 'moment';

const MoreMenu = (props: { fullView?: boolean; notifsRoute: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();
  const { fullView, notifsRoute } = props;

  const handlePress = () => {
    setIsOpen(!isOpen);
  };
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const defaultColor = isSeller ? 'noshade' : 'shade9';

  return (
    <MoreMenuContainer isOpen={isOpen}>
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
                  <Touchable onPress={() => console.log('mark as read')}>
                    <CheckCircle />
                    <Typography className="text" color={defaultColor}>
                      Mark as Read
                    </Typography>
                  </Touchable>
                </DropdownItemContainer>
                <DropdownItemContainer>
                  <Touchable onPress={() => console.log('Delete')}>
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
  const { type, isRead, content, date, fullView } = props;
  const isSeller = theme.appType === 'seller';
  const defaultColor = isSeller ? 'noshade' : 'shade9';
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
      case 'market-requests':
        icon = <MarketRequests {...defaulAvatarProps} />;
        break;
      case 'orders':
        icon = <Orders {...defaulAvatarProps} />;
        break;
      case 'rating-favourite':
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

  return (
    <Container isRead={isRead} fullView={fullView}>
      <div className="horizontal-style-container" />
      <NotifAvatar type={props.type} />
      <div className="content-container">
        <Typography
          weight="900"
          color={isRead ? 'shade7' : 'primary'}
          variant="overlineSmall"
        >
          {type}
        </Typography>
        <Typography color={defaultColor} variant="body">
          {content}
        </Typography>
        <Typography color="shade6" variant="caption">
          {moment(date).format('YYYY-MM-DD')}
        </Typography>
      </div>
      <RightComponentContainer>
        {!isRead && <NewIndicator />}
        <MoreMenu notifsRoute={notifsRoute} fullView={fullView} />
      </RightComponentContainer>
    </Container>
  );
};

export default React.memo(NotificationItem);
