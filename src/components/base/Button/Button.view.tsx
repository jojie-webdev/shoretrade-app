import React from 'react';

// import { useTheme } from 'utils/Theme';
import Spinner from 'components/base/Spinner';
import { Theme } from 'types/Theme';

import Typography from '../Typography';
import { ButtonProps } from './Button.props';
import {
  ButtonContainer,
  LoadingContainer,
  IconContainer,
} from './Button.style';
const Button = (props: ButtonProps): JSX.Element => {
  // const theme = useTheme();
  const {
    loading,
    icon,
    text,
    color,
    iconPosition = 'after',
    variant = 'primary',
    takeFullWidth = false,
    ...buttonProps
  } = props;

  let textColor: keyof Theme['brand'] | keyof Theme['grey'];

  if (variant === 'primary') {
    textColor = 'noshade';
  } else if (variant === 'outline') {
    textColor = 'primary';
  } else if (variant === 'success') {
    textColor = 'noshade';
  } else {
    textColor = 'shade5';
  }

  const hasText = text && text?.length > 0 ? true : false;

  return (
    <ButtonContainer
      color={color}
      variant={variant}
      hasText={hasText}
      iconPosition={iconPosition}
      takeFullWidth={takeFullWidth}
      {...buttonProps}
    >
      {iconPosition === 'before' && (
        <IconContainer hasText={hasText} iconPosition={iconPosition}>
          {icon}
        </IconContainer>
      )}

      {text && (
        <Typography variant="overline" color={textColor} weight="900">
          {text}
        </Typography>
      )}
      {loading && (
        <LoadingContainer>
          <Spinner width={24} height={24} />
        </LoadingContainer>
      )}

      {iconPosition === 'after' && !loading && (
        <IconContainer hasText={hasText} iconPosition={iconPosition}>
          {icon}
        </IconContainer>
      )}
    </ButtonContainer>
  );
};

export default Button;
