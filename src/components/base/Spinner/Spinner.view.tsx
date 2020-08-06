import React from 'react';

import { Spin } from 'components/base/SVG';

import { SpinnerProps } from './Spinner.props';
import { Container } from './Spinner.style';

const Spinner = (props: SpinnerProps): JSX.Element => {
  return (
    <Container>
      <Spin {...props} />
    </Container>
  );
};

export default React.memo(Spinner);
