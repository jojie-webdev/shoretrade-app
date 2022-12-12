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
    disabled,
    icon,
    text,
    color,
    iconPosition = 'after',
    variant = 'primary',
    takeFullWidth = false,
    size = 'md',
    textColor,
    pushLeft,
    ...buttonProps
  } = props;

  let defaultTextColor:
    | keyof Theme['brand']
    | keyof Theme['grey']
    | undefined = textColor;

  if (!defaultTextColor) {
    if (variant === 'primary') {
      defaultTextColor = 'noshade';
    } else if (variant === 'outline') {
      defaultTextColor = 'primary';
    } else if (variant === 'success') {
      defaultTextColor = 'noshade';
    } else if (variant === 'unselected') {
      defaultTextColor = 'noshade';
    } else {
      defaultTextColor = 'shade5';
    }
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
      disabled={disabled || loading}
      pushLeft={pushLeft}
      text={text}
      {...buttonProps}
    >
      {icon && iconPosition === 'before' && (
        <IconContainer hasText={hasText} iconPosition={iconPosition}>
          {icon}
        </IconContainer>
      )}

      {text && (
        <Typography
          noSfmFont
          variant={props.textVariant || textVariant}
          color={defaultTextColor}
          weight={props.textWeight || textWeight}
          style={{ marginTop: '2px' }}
        >
          {/* Added in CSS */}
        </Typography>
      )}

      {loading && (
        <LoadingContainer hasText={hasText}>
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
