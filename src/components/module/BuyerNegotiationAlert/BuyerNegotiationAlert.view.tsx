import React from 'react';

import {
  CheckFilled,
  CloseFilled,
  ExclamationFilled,
  InfoFilled,
  QuestionFilled,
} from 'components/base/SVG';
import { SVGProps } from 'components/base/SVG/SVG.props';
import Typography from 'components/base/Typography';
import { useTheme } from 'utils/Theme';

import { BuyerNegotiationAlertProps } from './BuyerNegotiationAlert.props';
import {
  AlertContainer,
  Container,
  TitleWrapper,
} from './BuyerNegotiationAlert.style';

const BuyerNegotiationAlert = (
  props: BuyerNegotiationAlertProps
): JSX.Element => {
  const theme = useTheme();
  const isBuyer = theme.appType === 'buyer';
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

  if (['declined', 'lost'].includes(status.toLowerCase())) {
    Icon = CloseFilled;
    IconFill = theme.brand.error;
  } else if (status.toLowerCase() === 'payment required') {
    Icon = ExclamationFilled;
    IconFill = theme.brand.primary;
  } else if (status.toLowerCase() === 'payment missed') {
    Icon = CloseFilled;
    IconFill = theme.brand.error;
  } else if (status.toLowerCase() === 'awaiting seller') {
    Icon = QuestionFilled;
    IconFill = theme.brand.alert;
  } else if (status.toLowerCase() === 'finalised') {
    Icon = CheckFilled;
    IconFill = theme.brand.success;
  } else if (
    status.toLowerCase() === 'counter offer' ||
    status.toLowerCase() === 'closed'
  ) {
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
            <TitleWrapper variant="label" weight="700">
              {header}
            </TitleWrapper>
          )}

          {typeof content === 'string' ? (
            <Typography variant="caption" color="shade7" weight="400">
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

export default React.memo(BuyerNegotiationAlert);
