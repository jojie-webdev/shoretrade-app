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
} from './NotificationItem.style';

const MoreMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handlePress = () => {
    setIsOpen(!isOpen);
  };

  return (
    <MoreMenuContainer isOpen={isOpen}>
      <div className="more-container">
        <Touchable onPress={() => handlePress()}>
          <More />
        </Touchable>
        <div className="dropdown-container">
          <div className="dropdown-menu animated" id="notification-dropdown">
            <div className="dropdown-header">
              <span className="triangle"></span>
            </div>
            <div className="dropdown-body">
              <div className="dropdown-content">
                <DropdownItemContainer>
                  <Touchable onPress={() => console.log('mark as read')}>
                    <CheckCircle />
                    <Typography className="text" color="noshade">
                      Mark as Read
                    </Typography>
                  </Touchable>
                </DropdownItemContainer>
                <DropdownItemContainer>
                  <Touchable onPress={() => console.log('Delete')}>
                    <FolderDownload />
                    <Typography className="text" color="noshade">
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

const NotifAvatar = (props: NotifAvatarProps) => {
  let icon: JSX.Element;
  switch (props.type) {
    case 'account':
      icon = <Account />;
      break;
    default:
      icon = <Account />;
  }

  return <NotifAvatarContainer>{icon}</NotifAvatarContainer>;
};

const NotificationItem = (props: NotificationItemProps): JSX.Element => {
  const theme = useTheme();
  const { type, isRead, content, date } = props;
  const isSeller = theme.appType === 'seller';
  const defaultColor = isSeller ? 'noshade' : 'shade9';
  return (
    <Container>
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

      {!isRead && <NewIndicator />}
      <MoreMenu />
    </Container>
  );
};

export default React.memo(NotificationItem);
