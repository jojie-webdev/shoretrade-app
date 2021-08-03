import React, { useEffect } from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import {
  CommentsAlt,
  DashboardOutlined,
  Desktop,
  EnvelopeAlt,
  Sold,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import GlobalNotificationToggle from 'components/module/GlobalNotificationToggle';
import NotificationSettingsCategoryItem from 'components/module/NotificationSettingsCategoryItem';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { isMobile } from 'react-device-detect';
import { Col, Row } from 'react-grid-system';
import { SpecificNotificationSettingItem } from 'types/store/GetNotificationSettingsState';
import { useTheme } from 'utils/Theme';

import { NotificationsSettingsProps } from './NotificationsSettings.props';
import {
  Container,
  GlobalNotificationsContainer,
  CategoryItemContainer,
  FooterContainer,
} from './NotificationsSettings.style';

const NotificationsSettingsView = ({
  globalSettings,
  handleGlobalToggle,
  groupedNotifSettings,
}: NotificationsSettingsProps) => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const defaultColor = isSeller ? 'noshade' : 'shade9';
  const iconColor = theme.grey.shade6;

  const notifSettings = Object.keys(groupedNotifSettings).reduce(
    (
      data: {
        id: string;
        specificNotifSettingItems: SpecificNotificationSettingItem[];
      }[],
      id
    ) => [
      ...data,
      {
        id: id,
        specificNotifSettingItems: groupedNotifSettings[id],
      },
    ],
    []
  );
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
          <div style={{ marginRight: 20, marginBottom: 40 }}>
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
        <Typography className="section-title" variant="body">
          Global Notification Settings
        </Typography>
        <div className="items-container">
          <div className="item">
            <GlobalNotificationToggle
              title="Browser"
              icon={<Desktop fill={iconColor} />}
              description="Push Notifications"
              onClick={() => handleGlobalToggle('browser')}
              checked={globalSettings?.browser.enabled || false}
            />
          </div>
          <div className="item">
            <GlobalNotificationToggle
              title="Email"
              icon={<EnvelopeAlt fill={iconColor} />}
              description="peter@shoretrade.com"
              onClick={() => handleGlobalToggle('email')}
              checked={globalSettings?.email.enabled || false}
            />
          </div>
          <div className="item">
            <GlobalNotificationToggle
              title="SMS"
              icon={<CommentsAlt fill={iconColor} />}
              description="+61 123 456 789"
              onClick={() => handleGlobalToggle('sms')}
              checked={globalSettings?.sms.enabled || false}
            />
          </div>
        </div>
      </GlobalNotificationsContainer>
      {notifSettings.map((ns) => (
        <CategoryItemContainer key={ns.id}>
          <div>
            <Typography color={defaultColor} variant="body">
              {ns.specificNotifSettingItems[0].resource
                .split(' ')
                .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
                .join(' ')}
            </Typography>
          </div>
          {ns.specificNotifSettingItems.map((i, index) => (
            <NotificationSettingsCategoryItem
              key={i.id + index}
              sms={i.settings.sms}
              browser={i.settings.push}
              email={i.settings.email}
              icon={<Sold fill={iconColor} />}
              title={i.name}
            ></NotificationSettingsCategoryItem>
          ))}
        </CategoryItemContainer>
      ))}
      <FooterContainer>
        <Button text="Save" variant="primary" />
      </FooterContainer>
    </Container>
  );
};

export default NotificationsSettingsView;
