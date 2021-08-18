import React, { useEffect } from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import { CommentsAlt, Desktop, EnvelopeAlt, Sold } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import GlobalNotificationToggle from 'components/module/GlobalNotificationToggle';
import Loading from 'components/module/Loading';
import NotificationSettingsCategoryItem from 'components/module/NotificationSettingsCategoryItem';
import { SELLER_ACCOUNT_ROUTES } from 'consts';
import { isMobile } from 'react-device-detect';
import { Col, Row } from 'react-grid-system';
import {
  SpecificNotificationSettingItem,
  SettingsToggleItem,
  NotificationSettingItem,
  CustomSettingKey,
} from 'types/store/GetNotificationSettingsState';
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
  loading,
  handleCustomSettingUpdate,
  email,
  contactNo,
}: NotificationsSettingsProps) => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const defaultColor = isSeller ? 'noshade' : 'shade9';
  const iconColor = theme.grey.shade7;

  const handleCustomSettingsChange = (
    item: NotificationSettingItem,
    option: CustomSettingKey,
    val: boolean
  ) => {
    handleCustomSettingUpdate(item, option, val);
  };

  // TODO: loading buttons or overlay loading
  // if (!globalSettings || loading) {
  //   return <Loading />;
  // }

  return (
    <Container>
      <Row nogutter justify="between" align="center">
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
              onClick={() => handleGlobalToggle('push')}
              checked={globalSettings?.push || false}
            />
          </div>
          <div className="item">
            <GlobalNotificationToggle
              title="Email"
              icon={<EnvelopeAlt fill={iconColor} />}
              description={email}
              onClick={() => handleGlobalToggle('email')}
              checked={globalSettings?.email || false}
            />
          </div>
          <div className="item">
            <GlobalNotificationToggle
              title="SMS"
              icon={<CommentsAlt fill={iconColor} />}
              description={contactNo}
              onClick={() => handleGlobalToggle('mobile')}
              checked={globalSettings?.mobile || false}
            />
          </div>
        </div>
      </GlobalNotificationsContainer>

      {groupedNotifSettings.map((ns) => (
        <CategoryItemContainer key={ns.resource}>
          <div>
            <Typography color={defaultColor} variant="body">
              {ns.resource
                .split('_')
                .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
                .join(' ')}
            </Typography>
          </div>
          {ns.items.map((i, index) => (
            <NotificationSettingsCategoryItem
              onChange={(val, option) =>
                handleCustomSettingsChange(i, option, val)
              }
              inapp={i.settings.inapp}
              key={index}
              mobile={i.settings.mobile}
              push={i.settings.push}
              email={i.settings.email}
              icon={<Sold fill={iconColor} />}
              title={i.title}
            ></NotificationSettingsCategoryItem>
          ))}
        </CategoryItemContainer>
      ))}
    </Container>
  );
};

export default NotificationsSettingsView;
