import React from 'react';

import { storiesOf } from '@storybook/react';

import SpinnerLogo from '../../../src/components/base/SpinnerLogo';
import Container from '../../components/Container';

storiesOf('base/SpinnerLogo', module).add('Summary', () => (
  <Container>
    <SpinnerLogo />
  </Container>
));
