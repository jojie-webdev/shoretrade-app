import React from 'react';

import { storiesOf } from '@storybook/react';

import Typography from '../../../src/components/base/Typography';
import AuthContainer from '../../../src/components/layout/AuthContainer';
import Container from '../../components/Container';

storiesOf('layout/AuthContainer', module).add('Basic', () => (
  <Container>
    <AuthContainer>
      <Typography variant="title3" color="noshade">
        Content
      </Typography>
    </AuthContainer>
  </Container>
));

storiesOf('layout/AuthContainer', module).add('With Header', () => (
  <Container>
    <AuthContainer
      title="Title"
      onBackAction={() => console.log('BACK ACTION')}
      onCloseAction={() => console.log('CLOSE ACTION')}
    >
      <Typography variant="title3" color="noshade">
        Content
      </Typography>
    </AuthContainer>
  </Container>
));
