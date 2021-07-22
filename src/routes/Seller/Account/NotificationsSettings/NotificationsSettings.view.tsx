import React, { useEffect } from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { isMobile } from 'react-device-detect';
import { Col, Row } from 'react-grid-system';

import { NotificationsSettingsProps } from './NotificationsSettings.props';
import { Container } from './NotificationsSettings.style';

const NotificationsSettingsView = ({
  ...props
}: NotificationsSettingsProps) => {
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
    </Container>
  );
};

export default NotificationsSettingsView;
