import React from 'react';

import { storiesOf } from '@storybook/react';

import MobileHeader from '../../../src/components/layout/MobileHeader';
import Container from '../../components/Container';

storiesOf('layout/MobileHeader', module).add('Summary', () => (
  <Container>
    <MobileHeader />
  </Container>
));
