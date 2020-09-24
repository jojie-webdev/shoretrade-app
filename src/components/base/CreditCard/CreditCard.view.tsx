import React from 'react';

import { Visa, Mastercard, Zippay, Paypal } from 'components/base/SVG';
import Typography from 'components/base/Typography';

// import { useTheme } from 'utils/Theme';
import { CreditCardProps } from './CreditCard.props';
import { Container, CCImage, CCNumRow } from './CreditCard.style';

const CreditCard = (props: CreditCardProps): JSX.Element => {
  // const theme = useTheme();
  function renderBrand(brand: string) {
    brand = brand ? brand.toLowerCase() : '';

    switch (brand) {
      case 'visa':
        return <Visa />;
      case 'mastercard':
        return <Mastercard />;
      case 'zippay':
        return <Zippay />;
      case 'paypal':
        return <Paypal />;
      default:
        return null;
    }
  }

  return (
    <Container>
      <CCImage>{renderBrand(props.brand)}</CCImage>

      <CCNumRow>
        <Typography text-align="left" variant="label" color="shade9">
          {`•••• •••• •••• ${props.lastFour}`}
        </Typography>
      </CCNumRow>
    </Container>
  );
};

export default React.memo(CreditCard);
