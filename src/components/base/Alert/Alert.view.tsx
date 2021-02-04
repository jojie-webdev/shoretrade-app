import React from 'react';

import { useTheme } from 'utils/Theme';

import {
  CheckFilled,
  CloseFilled,
  ExclamationFilled,
  QuestionFilled,
  InfoFilled,
} from '../SVG';
import { SVGProps } from '../SVG/SVG.props';
import Typography from '../Typography';
import { AlertProps } from './Alert.props';
import { Container } from './Alert.style';

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
    Icon = InfoFilled;
    IconFill = theme.brand.alert;
  } else if (variant === 'alert') {
    Icon = QuestionFilled;
    IconFill = theme.brand.alert;
  } else if (variant === 'warning') {
    Icon = ExclamationFilled;
    IconFill = theme.brand.warning;
  } else if (variant === 'error') {
    Icon = CloseFilled;
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

          <Typography
            variant={header ? 'body' : 'label'}
            color={header ? 'shade6' : isSeller ? 'noshade' : 'shade9'}
            weight="400"
          >
            {content}
          </Typography>
        </div>

        {iconRight && <div>{iconRight}</div>}
      </div>
    </Container>
  );
};

export default React.memo(Alert);
