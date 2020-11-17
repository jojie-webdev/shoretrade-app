import React from 'react';

import CreditCard from 'components/base/CreditCard';
import { RoundedTickActive, RoundedTickInactive } from 'components/base/SVG';

// import { useTheme } from 'utils/Theme';
import { CreditCardRowProps } from './CreditCardRow.props';
import { Container, CCStatus } from './CreditCardRow.style';

const CreditCardRow = (props: CreditCardRowProps): JSX.Element => {
  // const theme = useTheme();

  return (
    <Container {...props}>
      <CreditCard lastFour={props.lastFour} brand={props.brand} />

      <CCStatus>
        {props.active ? <RoundedTickActive /> : <RoundedTickInactive />}
      </CCStatus>
    </Container>
  );
};

export default React.memo(CreditCardRow);
