import React from 'react';

import { useTheme } from 'utils/Theme';

import {
  CheckFilled,
  CloseFilled,
  ExclamationFilled,
  QuestionFilled,
  InfoFilled,
} from '../SVG';
import Typography from '../Typography';
import { AlertProps } from './Alert.props';
import { Container, AlertButton } from './Alert.style';

const Alert = (props: AlertProps): JSX.Element => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const { content, variant, onClick, buttonText, ...containerProps } = props;

  let Icon = InfoFilled;

  if (variant === 'default') {
    Icon = InfoFilled;
  } else if (variant === 'alert') {
    Icon = QuestionFilled;
  } else if (variant === 'warning') {
    Icon = ExclamationFilled;
  } else if (variant === 'error') {
    Icon = CloseFilled;
  } else if (variant === 'success') {
    Icon = CheckFilled;
  }

  return (
    <Container variant={variant} {...containerProps}>
      <div className="top-content-container">
        <div className="svg-container">
          <Icon />
        </div>
        <Typography
          variant="label"
          color={isSeller ? 'noshade' : 'shade8'}
          weight="500"
        >
          {content}
        </Typography>
      </div>

      {buttonText !== undefined && onClick !== undefined && (
        <div className="alert-button-container">
          <AlertButton variant={variant} onClick={onClick}>
            <Typography color="noshade">{buttonText}</Typography>
          </AlertButton>
        </div>
      )}
    </Container>
  );
};

export default React.memo(Alert);
