import React from 'react';

import { useTheme } from 'utils/SFMTheme';

import {
  CheckFilled,
  ExclamationFilled,
  QuestionFilled,
  InfoFilled,
} from '../SVG';
import { SVGProps } from '../SVG/SVG.props';
import Typography from '../Typography';
import { AlertProps } from './Alert.props';
import { AlertContainer, Container } from './Alert.style';

const Alert = (props: AlertProps): JSX.Element => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const {
    header,
    content,
    iconRight,
    children,
    variant,
    alignText = 'flex-start',
    fullWidth,
    ...containerProps
  } = props;

  let Icon: React.FC<SVGProps> = InfoFilled;
  let IconFill = '';

  if (variant === 'info') {
    Icon = InfoFilled;
    IconFill = theme.brand.info;
  } else if (variant === 'infoAlert') {
    Icon = QuestionFilled;
    IconFill = theme.brand.alert;
  } else if (variant === 'alert') {
    Icon = QuestionFilled;
    IconFill = theme.brand.alert;
  } else if (variant === 'warning') {
    Icon = ExclamationFilled;
    IconFill = theme.brand.warning;
  } else if (variant === 'error') {
    Icon = ExclamationFilled;
    IconFill = theme.brand.error;
  } else if (variant === 'success') {
    Icon = CheckFilled;
    IconFill = theme.brand.success;
  }

  return (
    <Container
      variant={variant}
      alignText={alignText}
      fullWidth={fullWidth}
      {...containerProps}
    >
      <div className="horizontal-style-container" />

      <div className="content-container">
        <div className="svg-container">
          <Icon width={20} height={20} fill={IconFill} />
        </div>

        <div className="text-container">
          {header && (
            <Typography
              variant="body"
              color={isSeller ? 'noshade' : 'shade9'}
              weight="700"
            >
              {header}
            </Typography>
          )}

          {typeof content === 'string' ? (
            <Typography
              variant={header ? 'body' : 'label'}
              color={header ? 'shade6' : isSeller ? 'noshade' : 'shade9'}
              weight="400"
            >
              {content}
            </Typography>
          ) : (
            content
          )}
        </div>
      </div>

      {iconRight && <AlertContainer>{iconRight}</AlertContainer>}
    </Container>
  );
};

export default React.memo(Alert);
