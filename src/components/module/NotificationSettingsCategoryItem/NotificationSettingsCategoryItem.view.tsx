/* eslint-disable react/prop-types */
import React from 'react';

import Accordion from 'components/base/Accordion';
import {
  CommentsAlt,
  Desktop,
  EnvelopeAlt,
  Account,
  Anchor,
  DashboardAlt as ListingsIcon,
  MarketRequests,
  Orders,
  Star,
  WhatsApp,
} from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { BREAKPOINTS } from 'consts/breakpoints';
import { useMediaQuery } from 'react-responsive';
import { CustomSettingKey } from 'types/store/GetNotificationSettingsState';
import { SpecialColors } from 'utils/SFMTheme';
import { useTheme } from 'utils/Theme';

import { NotificationSettingsCategoryItemProps } from './NotificationSettingsCategoryItem.props';
import {
  Container,
  CustomCheckBoxContainer,
  OptionsContainer,
  StyledCheckbox,
  LeftComponentContainer,
  TextIndicatorsContainer,
  Description,
} from './NotificationSettingsCategoryItem.style';

const NotificationSettingsCategoryItem = (
  props: NotificationSettingsCategoryItemProps
): JSX.Element => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const {
    title,
    mobile,
    email,
    push,
    whatsapp,
    onChange,
    type,
    description,
  } = props;
  const isMobile = useMediaQuery({ query: BREAKPOINTS['sm'] });
  const defaultColor = isSeller ? 'noshade' : 'shade9';
  const iconColor = isSeller ? theme.grey.shade7 : theme.grey.shade6;

  const SettingsIcon = () => {
    let icon: JSX.Element;
    const defaulAvatarProps = {
      width: 24,
      height: 24,
      fill: theme.grey.shade7,
    };
    const parsedType = type
      .split(' ')
      .map((m) => m.toLocaleLowerCase())
      .join('_');
    switch (parsedType) {
      case 'account':
        icon = <Account {...defaulAvatarProps} />;
        break;
      case 'inactivity':
        icon = <Account {...defaulAvatarProps} />;
        break;
      case 'market_requests':
        icon = <MarketRequests {...defaulAvatarProps} />;
        break;
      case 'market_board':
        icon = <MarketRequests {...defaulAvatarProps} />;
        break;
      case 'ordering':
        icon = <Orders {...defaulAvatarProps} />;
        break;
      case 'orders':
        icon = <Orders {...defaulAvatarProps} />;
        break;
      case 'sold':
        icon = <Orders {...defaulAvatarProps} />;
        break;
      case 'rating_favourite':
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
    return icon;
  };

  const textIndicatorColor = (enabled: boolean) => {
    if (!enabled) {
      return 'shade6';
    }
    return defaultColor;
  };

  const TextIndicators = () => {
    return (
      <TextIndicatorsContainer>
        {push.supported && (
          <Typography
            className="text-indicator"
            variant="caption"
            color={textIndicatorColor(push.enabled)}
          >
            Push
          </Typography>
        )}
        {email.supported && (
          <Typography
            className="text-indicator"
            variant="caption"
            color={textIndicatorColor(email.enabled)}
          >
            Email
          </Typography>
        )}
        {mobile.supported && (
          <Typography
            className="text-indicator"
            variant="caption"
            color={textIndicatorColor(mobile.enabled)}
          >
            SMS
          </Typography>
        )}
        {whatsapp.supported && (
          <Typography
            className="text-indicator"
            variant="caption"
            color={textIndicatorColor(whatsapp.enabled)}
          >
            WhatsApp
          </Typography>
        )}
      </TextIndicatorsContainer>
    );
  };

  const renderDescription = () => (
    <Typography
      variant="label"
      color={defaultColor}
      style={{ padding: isMobile ? '4px 24px 0 24px' : '4px 32px 0 32px' }}
    >
      {description}
    </Typography>
  );

  return (
    <Container>
      <Accordion
        iconColor={theme.brand.primary}
        keepIcon={true}
        leftComponent={
          <LeftComponentContainer>
            <div className="icon-container">{SettingsIcon()}</div>
            <div>
              <Typography color={defaultColor} altFont>
                {title}
              </Typography>
              <div>{isMobile && <TextIndicators />}</div>
            </div>
          </LeftComponentContainer>
        }
        rightComponent={!isMobile && <TextIndicators />}
        bottomComponent={!isMobile && renderDescription()}
        sameWidth={true}
        withBackground
        title="Test"
      >
        {isMobile && <Description>{renderDescription()}</Description>}
        <OptionsContainer>
          <CustomCheckBoxContainer>
            <StyledCheckbox
              onClick={() => onChange(!push.enabled, CustomSettingKey.PUSH)}
              disabled={!push.supported}
              style={{ position: 'absolute', top: '12px', right: '12px' }}
              checked={push.enabled}
            />
            <Desktop fill={iconColor} width={48} height={48} />
            <Typography color={defaultColor} variant="label">
              Push
            </Typography>
          </CustomCheckBoxContainer>
          <CustomCheckBoxContainer>
            <StyledCheckbox
              disabled={!email.supported}
              onClick={() => onChange(!email.enabled, CustomSettingKey.EMAIL)}
              style={{ position: 'absolute', top: '12px', right: '12px' }}
              checked={email.enabled}
            />
            <EnvelopeAlt fill={iconColor} width={48} height={48} />
            <Typography color={defaultColor} variant="label">
              Email
            </Typography>
          </CustomCheckBoxContainer>
          <CustomCheckBoxContainer>
            <StyledCheckbox
              disabled={!mobile.supported}
              onClick={() => onChange(!mobile.enabled, CustomSettingKey.MOBILE)}
              style={{ position: 'absolute', top: '12px', right: '12px' }}
              checked={mobile.enabled}
            />
            <CommentsAlt fill={iconColor} width={48} height={48} />
            <Typography color={defaultColor} variant="label">
              SMS
            </Typography>
          </CustomCheckBoxContainer>
          <CustomCheckBoxContainer>
            <StyledCheckbox
              disabled={!whatsapp.supported}
              onClick={() =>
                onChange(!whatsapp.enabled, CustomSettingKey.WHATSAPP)
              }
              style={{ position: 'absolute', top: '12px', right: '12px' }}
              checked={whatsapp.enabled}
            />
            <WhatsApp fill={iconColor} width={48} height={48} />
            <Typography color={defaultColor} variant="label">
              WhatsApp
            </Typography>
          </CustomCheckBoxContainer>
        </OptionsContainer>
      </Accordion>
    </Container>
  );
};

export default React.memo(NotificationSettingsCategoryItem);
