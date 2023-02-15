import React from 'react';

import Typography from 'components/base/Typography';
import { TypographyProps } from 'components/base/Typography/Typography.props';
import { useTheme } from 'utils/Theme';

import { NegotiationTagProps } from './NegotiationTag.props';
import { Container } from './NegotiationTag.style';

const NegotiationTag = (props: NegotiationTagProps): JSX.Element => {
  const theme = useTheme();

  const getBackgroundColor = () => {
    switch (typeof props.text === 'string' && props.text.toLowerCase()) {
      case 'finalized':
        return {
          textColor: 'success',
          bgColor: theme.grey.noshade,
        };

      case 'new negotiation':
        return {
          textColor: 'alert',
          bgColor: theme.grey.noshade,
        };

      case 'awaiting buyer':
        return {
          textColor: 'primary',
          bgColor: theme.grey.noshade,
        };

      case 'awaiting payment':
        return {
          textColor: 'noshade',
          bgColor: theme.brand.primary,
        };

      case 'lost':
        return {
          textColor: 'noshade',
          bgColor: theme.brand.error,
        };

      case 'decline':
        return {
          textColor: 'noshade',
          bgColor: theme.brand.error,
        };

      default:
        return {
          textColor: 'shade9',
          bgColor: theme.grey.noshade,
        };
    }
  };

  return (
    <Container backgroundColor={getBackgroundColor().bgColor}>
      <Typography
        weight="700"
        color={getBackgroundColor().textColor as TypographyProps['color']}
        style={{ fontFamily: 'Basis Grotesque Pro' }}
      >
        {props.text}
      </Typography>
    </Container>
  );
};

export default React.memo(NegotiationTag);
