import React, { useEffect } from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import { Desktop } from 'components/base/SVG';
import GlobalNotificationToggle from 'components/module/GlobalNotificationToggle';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { isMobile } from 'react-device-detect';
import { Col, Row } from 'react-grid-system';

import { NotificationsSettingsProps } from './NotificationsSettings.props';
import {
  Container,
  GlobalNotificationsContainer,
} from './NotificationsSettings.style';

const NotificationsSettingsView = ({
  globalSettings,
}: NotificationsSettingsProps) => {
  console.log(globalSettings);
  return (
    <Container>
      <Row
        nogutter
        justify="between"
        align="center"
        // style={{
        //   marginBottom:
        //     !isInner && isEmpty(innerCategories) && !isMobile ? 40 : 0,
        // }}
      >
        <Col>
          <div style={{ marginRight: 20, marginBottom: isMobile ? 40 : 0 }}>
            <Breadcrumbs
              sections={[
                { label: 'Account', link: SELLER_ACCOUNT_ROUTES.LANDING },
                { label: 'Notifications' },
              ]}
            />
          </div>
        </Col>
      </Row>
      <GlobalNotificationsContainer>
        <div className="item">
          <GlobalNotificationToggle
            title="Browser"
            icon={<Desktop />}
            description="Push Notifications"
            onClick={() => console.log('clicked')}
            checked={globalSettings.browser}
          />
        </div>
        <div className="item">
          <GlobalNotificationToggle
            title="Email"
            icon={<Desktop />}
            description="peter@shoretrade.com"
            onClick={() => console.log('clicked')}
            checked={globalSettings.email}
          />
        </div>
        <div className="item">
          <GlobalNotificationToggle
            title="SMS"
            icon={<Desktop />}
            description="+61 123 456 789"
            onClick={() => console.log('clicked')}
            checked={globalSettings.sms}
          />
        </div>
      </GlobalNotificationsContainer>
    </Container>
  );
};

export default NotificationsSettingsView;
