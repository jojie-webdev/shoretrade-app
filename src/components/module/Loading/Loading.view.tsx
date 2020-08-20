import React from 'react';

// import { useTheme } from 'utils/Theme';
import Spinner from 'components/base/Spinner';

import { LoadingProps } from './Loading.props';
import { Container, Label } from './Loading.style';

const Loading = (props: LoadingProps): JSX.Element => {
  // const theme = useTheme();
  const { label = 'Loading...' } = props;
  return (
    <Container>
      <Spinner />
      <Label variant="label" color="shade2">
        {label}
      </Label>
    </Container>
  );
};

export default React.memo(Loading);
