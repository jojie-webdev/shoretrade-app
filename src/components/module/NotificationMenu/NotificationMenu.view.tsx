import React, { useState } from 'react';

import { Bell } from 'components/base/SVG';
import Typography from 'components/base/Typography';
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
import Touchable from 'components/base/Touchable';

const NotificationMenu = (props: NotificationMenuProps): JSX.Element => {
  const theme = useTheme();
  const history = useHistory();

  const { notifTotal } = props;
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const handleBellClick = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const isMobile = useMediaQuery({
    query: BREAKPOINTS.sm,
  });
  return (
    <Container isOpenMenu={isOpenMenu}>
      <div className="icon-wrapper">
        <Touchable onPress={() => handleBellClick()}>
          <Bell fill={isMobile ? theme.grey.noshade : theme.grey.shade8} />
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
                    isRead={false}
                  />
                </DropdownItemContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default React.memo(NotificationMenu);
