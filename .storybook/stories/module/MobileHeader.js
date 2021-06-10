import React from 'react';

import { storiesOf } from '@storybook/react';

import MobileHeader from '../../../src/components/module/MobileHeader';
import Container from '../../components/Container';

storiesOf('module/MobileHeader', module).add('Summary', () => (
  <Container>
    <MobileHeader />
  </Container>
));
