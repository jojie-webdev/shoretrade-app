import React from 'react';

import Toggle from 'components/base/Toggle';
// import { useTheme } from 'utils/Theme';
import Typography from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { GlobalNotificationToggleProps } from './GlobalNotificationToggle.props';
import {
  Container,
  IconContainer,
  LeftComponentContainer,
} from './GlobalNotificationToggle.style';

const GlobalNotificationToggle = (
  props: GlobalNotificationToggleProps
): JSX.Element => {
  const theme = useTheme();
  const { checked, onClick, icon, title, description } = props;
  const isSeller = theme.appType === 'seller';
  return (
    <Container>
      <IconContainer>{icon}</IconContainer>
      <LeftComponentContainer>
        <Typography color={isSeller ? 'noshade' : 'shade9'} variant="body">
          {title}
        </Typography>
        <Typography color={isSeller ? 'shade6' : 'shade6'} variant="caption">
          {description}
        </Typography>
      </LeftComponentContainer>
      <Toggle onClick={() => onClick()} checked={checked} />
    </Container>
  );
};

export default React.memo(GlobalNotificationToggle);
