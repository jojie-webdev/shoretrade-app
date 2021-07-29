import React, { useState } from 'react';

// eslint-disable-next-line import/order
import {
  Account,
  CheckCircle,
  FolderDownload,
  More,
} from 'components/base/SVG';

// import { useTheme } from 'utils/Theme';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { Content } from 'components/layout/AuthContainer/AuthContainer.style';
import { BUYER_ROUTES, SELLER_ROUTES } from 'consts';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

import {
  NotificationItemProps,
  NotificationType,
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

const MoreMenu = (props: { fullView?: boolean; notifsRoute: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  const history = useHistory();
  const { fullView, notifsRoute } = props;

  const handlePress = () => {
    if (!fullView) {
      // go to notifcations page
      history.push(notifsRoute);
    } else {
      setIsOpen(!isOpen);
    }
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
    switch (props.type) {
      case 'account':
        icon = <Account fill={iconColor} />;
        break;
      default:
        icon = <Account fill={iconColor} />;
    }
    return <NotifAvatarContainer>{icon}</NotifAvatarContainer>;
  };

  return (
    <Container isRead={isRead} fullView={fullView}>
      <div className="horizontal-style-container" />
      <NotifAvatar type="account" />
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
          {date?.format('ddd, hA') || '--'}
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
