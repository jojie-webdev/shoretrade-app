import React from 'react';

// import { useTheme } from 'utils/Theme';
import Spinner from 'components/base/Spinner';
import { Theme } from 'types/Theme';

import Typography from '../Typography';
import { ButtonProps } from './Button.props';
import { ButtonContainer, LoadingContainer } from './Button.style';
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
  } else {
    textColor = 'shade5';
  }

  return (
    <ButtonContainer
      color={color}
      variant={variant}
      hasText={text && text?.length > 0 ? true : false}
      iconPosition={iconPosition}
      takeFullWidth={takeFullWidth}
      {...buttonProps}
    >
      {iconPosition === 'before' && icon}

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

      {iconPosition === 'after' && !loading && icon}
    </ButtonContainer>
  );
};

export default Button;
