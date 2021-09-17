import React, { useEffect } from 'react';

import Breadcrumbs from 'components/base/Breadcrumbs';
import Button from 'components/base/Button';
import {
  CommentsAlt,
  Desktop,
  EnvelopeAlt,
  Sold,
  WhatsApp,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import ConfirmationModal from 'components/module/ConfirmationModal';
import GlobalNotificationToggle from 'components/module/GlobalNotificationToggle';
import IconTooltip from 'components/module/IconTooltip';
import Loading from 'components/module/Loading';
import NotificationSettingsCategoryItem from 'components/module/NotificationSettingsCategoryItem';
import { BUYER_ACCOUNT_ROUTES, SELLER_ACCOUNT_ROUTES } from 'consts';
import { isMobile } from 'react-device-detect';
import { Col, Row } from 'react-grid-system';
import {
  SpecificNotificationSettingItem,
  SettingsToggleItem,
  NotificationSettingItem,
  CustomSettingKey,
} from 'types/store/GetNotificationSettingsState';
import { GLOBAL_DEACTIVATION_MESSAGE } from 'types/store/GetNotificationsState';
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
  contactNo,
  email,
  handleCustomSettingUpdate,
  showDeactivationWarning,
  setShowDeactivationWarning,
  currentCustomSetting,
  setCurrentCustomSetting,
  setCurrentGlobalSetting,
  currentGlobalSetting,
}: NotificationsSettingsProps) => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const defaultColor = isSeller ? 'noshade' : 'shade9';
  const iconColor = theme.grey.shade7;

  const totalEnabledGlobal = Object.keys(globalSettings).reduce(
    (accum: number, key: string) => {
      if (
        // @ts-ignore

        globalSettings[key] &&
        key !== 'inapp'
      ) {
        return accum + 1;
      }

      return accum;
    },

    0
  );
  const handleOnGlobalToggle = (
    key: 'email' | 'mobile' | 'push' | 'whatsapp'
  ) => {
    setCurrentGlobalSetting(key);
    if (totalEnabledGlobal === 1 && globalSettings[key] === true) {
      setShowDeactivationWarning(GLOBAL_DEACTIVATION_MESSAGE);
    } else {
      handleGlobalToggle(key);
    }
  };

  return (
    <Container>
      <Row nogutter justify="between" align="center">
        <Col>
          <div style={{ marginRight: 20, marginBottom: 40 }}>
            <Breadcrumbs
              sections={[
                { label: 'Account', link: BUYER_ACCOUNT_ROUTES.LANDING },
                { label: 'Notifications' },
              ]}
            />
          </div>
        </Col>
      </Row>
      <GlobalNotificationsContainer>
        <header className="header">
          <Typography className="section-title" variant="body">
            Global Notification Settings{' '}
          </Typography>
          <IconTooltip
            variant="info"
            content="Toggle the notification mediums On and Off to update your preferences for all notifications."
          />
        </header>

        <div className="items-container">
          <div className="item">
            <GlobalNotificationToggle
              title="Push"
              icon={<Desktop fill={iconColor} />}
              description="Push Notifications"
              onClick={() => handleOnGlobalToggle('push')}
              checked={globalSettings?.push || false}
            />
          </div>
          <div className="item">
            <GlobalNotificationToggle
              title="Email"
              icon={<EnvelopeAlt fill={iconColor} />}
              description={email}
              onClick={() => handleOnGlobalToggle('email')}
              checked={globalSettings?.email || false}
            />
          </div>
          <div className="item">
            <GlobalNotificationToggle
              title="SMS"
              icon={<CommentsAlt fill={iconColor} />}
              description={contactNo}
              onClick={() => handleOnGlobalToggle('mobile')}
              checked={globalSettings?.mobile || false}
            />
          </div>
          <div className="item">
            <GlobalNotificationToggle
              title="WhatsApp"
              icon={<WhatsApp width={24} height={24} fill={iconColor} />}
              description={contactNo}
              onClick={() => handleOnGlobalToggle('whatsapp')}
              checked={globalSettings?.whatsapp || false}
            />
          </div>
        </div>
      </GlobalNotificationsContainer>

      {groupedNotifSettings.map((ns) => (
        <CategoryItemContainer key={ns.resource}>
          <div>
            <Typography color={defaultColor} variant="body">
              {ns.resource}
            </Typography>
          </div>
          {ns.items.map((i, index) => (
            <NotificationSettingsCategoryItem
              onChange={(val, option) =>
                setCurrentCustomSetting({
                  item: i,
                  option,
                  val,
                  deactivationWarning: i.deactivationWarning,
                })
              }
              inapp={i.settings.inapp}
              key={index}
              mobile={i.settings.mobile}
              whatsapp={i.settings.whatsapp}
              push={i.settings.push}
              email={i.settings.email}
              type={ns.resource}
              title={i.title}
            ></NotificationSettingsCategoryItem>
          ))}
        </CategoryItemContainer>
      ))}
      <ConfirmationModal
        isOpen={showDeactivationWarning !== ''}
        title="Deactivation Warning"
        description={showDeactivationWarning}
        action={() => {
          if (currentCustomSetting !== null) {
            handleCustomSettingUpdate && handleCustomSettingUpdate();
          } else {
            handleGlobalToggle(currentGlobalSetting);
          }
        }}
        actionText="DEACTIVATE"
        onClickClose={() => {
          setShowDeactivationWarning('');
          setCurrentCustomSetting(null);
        }}
      />
    </Container>
  );
};

export default NotificationsSettingsView;
