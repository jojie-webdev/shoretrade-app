import React from 'react';

import Spinner from 'components/base/Spinner';
import { useTheme } from 'utils/Theme';

import { LoadingProps } from './Loading.props';
import { Container, Label } from './Loading.style';

const Loading = (props: LoadingProps): JSX.Element => {
  const theme = useTheme();
  const isSeller = theme.appType === 'seller';
  const { label = 'Loading...', color = 'shade2' } = props;
  const defaultColor = isSeller ? 'shade2' : 'shade6';

  return (
    <Container>
      <Spinner />
      <Label variant="label" color={color || defaultColor}>
        {label}
      </Label>
    </Container>
  );
};

export default React.memo(Loading);
