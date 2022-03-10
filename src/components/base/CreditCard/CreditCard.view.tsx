import React from 'react';

import { ATMCard } from 'components/base/SVG';
import Typography from 'components/base/Typography';
import { toMaskedCardNumber } from 'utils/String/maskedCardNumber';
import { useTheme } from 'utils/Theme';

import { CreditCardProps } from './CreditCard.props';
import { Container, CCNumRow } from './CreditCard.style';

const CreditCard = (props: CreditCardProps): JSX.Element => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';

  return (
    <Container>
      <div style={{ marginRight: '8px' }}>
        <ATMCard />
      </div>

      <CCNumRow>
        <Typography
          text-align="left"
          variant="label"
          color={isSeller ? 'noshade' : 'shade9'}
        >
          {`${toMaskedCardNumber(props.brand, props.lastFour)} (${
            props.brand
          })`}
        </Typography>
        <Typography text-align="left" variant="small" color="shade6">
          Exp. {props.expMonth}/{props.expYear}
        </Typography>
      </CCNumRow>
    </Container>
  );
};

export default React.memo(CreditCard);
