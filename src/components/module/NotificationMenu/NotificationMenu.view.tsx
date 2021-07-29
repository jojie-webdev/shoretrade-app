import React, { useState } from 'react';

import Button from 'components/base/Button';
import { Bell } from 'components/base/SVG';
import Touchable from 'components/base/Touchable';
import Typography from 'components/base/Typography';
import { BUYER_ROUTES, SELLER_ROUTES } from 'consts';
import { BREAKPOINTS } from 'consts/breakpoints';
import moment from 'moment';
import { useMediaQuery } from 'react-responsive';
import { useHistory } from 'react-router-dom';
import { useTheme } from 'utils/Theme';

// import { useTheme } from 'utils/Theme';
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
  const isSeller = theme.appType === 'seller';
  const notifsRoute =
    theme.appType === 'buyer'
      ? BUYER_ROUTES.NOTIFICATIONS
      : SELLER_ROUTES.NOTIFICATIONS;

  const { notifTotal } = props;
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleBellClick = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const isMobile = useMediaQuery({
    query: BREAKPOINTS.sm,
  });

  const bellColor = () => {
    if (isMobile) {
      return theme.grey.noshade;
    } else if (isSeller) {
      return theme.grey.noshade;
    }
    return theme.grey.shade9;
  };

  return (
    <Container isOpenMenu={isOpenMenu}>
      <div className="icon-wrapper">
        <Touchable onPress={() => handleBellClick()}>
          <Bell fill={bellColor()} />
          {notifTotal > 0 && (
            <NotifCount>
              <Typography color="noshade" variant="small" weight="900">
                {notifTotal}
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
                <DropdownItemContainer>
                  <NotificationItem
                    type="account"
                    content="Test"
                    date={moment()}
                    isRead={false}
                  />
                </DropdownItemContainer>
                <DropdownItemContainer>
                  <NotificationItem
                    type="account"
                    content="Test"
                    date={moment()}
                    isRead={true}
                  />
                </DropdownItemContainer>
              </div>
              <div className="menu-footer">
                <Button
                  onClick={() => history.push(notifsRoute)}
                  size="sm"
                  variant="outline"
                  text="See All"
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
