import React from 'react';

import { storiesOf } from '@storybook/react';

import Typography from '../../../src/components/base/Typography';
import AuthContainer from '../../../src/components/layout/AuthContainer';
import Container from '../../components/Container';

storiesOf('layout/AuthContainer', module).add('Summary', () => (
  <Container>
    <AuthContainer>
      <Typography variant="title3" color="noshade">
        Sample
      </Typography>
    </AuthContainer>
  </Container>
));
