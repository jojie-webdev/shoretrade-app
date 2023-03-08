import React from 'react';

import {
  CheckFilled,
  ExclamationFilled,
  InfoFilled,
  QuestionFilled,
} from 'components/base/SVG';
import { SVGProps } from 'components/base/SVG/SVG.props';
import Typography from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { SellerNegotiationAlertProps } from './SellerNegotiationAlert.props';
import { AlertContainer, Container } from './SellerNegotiationAlert.style';

const SellerNegotiationAlert = (
  props: SellerNegotiationAlertProps
): JSX.Element => {
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
    status,
    ...containerProps
  } = props;

  let Icon: React.FC<SVGProps> = InfoFilled;
  let IconFill = '';

  if (status === '') {
    Icon = CheckFilled;
    IconFill = theme.brand.success;
  } else if (status === 'declined') {
    Icon = ExclamationFilled;
    IconFill = theme.brand.error;
  } else if (status === 'awaiting payment') {
    Icon = ExclamationFilled;
    IconFill = theme.brand.primary;
  } else if (status === 'awaiting buyer') {
    Icon = QuestionFilled;
    IconFill = theme.brand.alert;
  } else if (status === 'new negotiation' || status === 'closed') {
    Icon = ExclamationFilled;
    IconFill = theme.brand.alert;
  } else if (status === 'finalised') {
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

export default React.memo(SellerNegotiationAlert);
