import React from 'react';

import Accordion from 'components/base/Accordion';
import Checkbox from 'components/base/Checkbox';
import {
  CommentsAlt,
  Desktop,
  DollarSign,
  EnvelopeAlt,
} from 'components/base/SVG';

// import { useTheme } from 'utils/Theme';
import Typography from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { NotificationSettingsCategoryItemProps } from './NotificationSettingsCategoryItem.props';
import {
  Container,
  CustomCheckBoxContainer,
  OptionsContainer,
  StyledCheckbox,
  LeftComponentContainer,
  RightComponentContainer,
} from './NotificationSettingsCategoryItem.style';

const NotificationSettingsCategoryItem = (
  props: NotificationSettingsCategoryItemProps
): JSX.Element => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const { title, icon, mobile, email, push } = props;

  const defaultColor = isSeller ? 'noshade' : 'shade9';
  const iconColor = isSeller ? theme.grey.shade7 : theme.grey.shade6;

  const textIndicatorColor = (enabled: boolean) => {
    if (!enabled) {
      return 'shade6';
    }
    return defaultColor;
  };

  return (
    <Container>
      <Accordion
        leftComponent={
          <LeftComponentContainer>
            <div className="icon-container">{icon}</div>
            <div>
              <Typography color={defaultColor}>{title}</Typography>
            </div>
          </LeftComponentContainer>
        }
        rightComponent={
          <RightComponentContainer>
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
          </RightComponentContainer>
        }
        sameWidth={true}
        withBackground
        title="Test"
      >
        <OptionsContainer>
          <CustomCheckBoxContainer>
            <StyledCheckbox
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
              style={{ position: 'absolute', top: '12px', right: '12px' }}
              checked={mobile.enabled}
            />
            <CommentsAlt fill={iconColor} width={48} height={48} />
            <Typography color={defaultColor} variant="label">
              SMS
            </Typography>
          </CustomCheckBoxContainer>
        </OptionsContainer>
      </Accordion>
    </Container>
  );
};

export default React.memo(NotificationSettingsCategoryItem);
