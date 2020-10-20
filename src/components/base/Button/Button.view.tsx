import React from 'react';

// import { useTheme } from 'utils/Theme';
import Spinner from 'components/base/Spinner';
import { Theme } from 'types/Theme';

import Typography from '../Typography';
import { TypographyProps } from '../Typography/Typography.props';
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
    size = 'md',
    ...buttonProps
  } = props;

  let textColor: keyof Theme['brand'] | keyof Theme['grey'];

  if (variant === 'primary') {
    textColor = 'noshade';
  } else if (variant === 'outline') {
    textColor = 'primary';
  } else if (variant === 'success') {
    textColor = 'noshade';
  } else if (variant === 'unselected') {
    textColor = 'noshade';
  } else {
    textColor = 'shade5';
  }

  let textVariant: TypographyProps['variant'];
  let textWeight = '500';

  if (size === 'sm') {
    textVariant = 'label';
    textWeight = '500';
  } else if (size === 'md') {
    textVariant = 'overline';
    textWeight = '900';
  }

  const hasText = !!(text && text?.length > 0);

  return (
    <ButtonContainer
      size={size}
      color={color}
      variant={variant}
      hasText={hasText}
      iconPosition={iconPosition}
      takeFullWidth={takeFullWidth}
      {...buttonProps}
    >
      {icon && iconPosition === 'before' && (
        <IconContainer hasText={hasText} iconPosition={iconPosition}>
          {icon}
        </IconContainer>
      )}

      {text && (
        <Typography
          variant={props.textVariant || textVariant}
          color={textColor}
          weight={props.textWeight || textWeight}
        >
          {text}
        </Typography>
      )}

      {loading && (
        <LoadingContainer>
          <Spinner width={24} height={24} />
        </LoadingContainer>
      )}

      {icon && iconPosition === 'after' && !loading && (
        <IconContainer hasText={hasText} iconPosition={iconPosition}>
          {icon}
        </IconContainer>
      )}
    </ButtonContainer>
  );
};

export default Button;
