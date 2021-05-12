import React from 'react';

import { storiesOf } from '@storybook/react';

import MobileFooter from '../../../src/components/layout/MobileFooter';
import Container from '../../components/Container';

storiesOf('layout/MobileFooter', module).add('Summary', () => (
  <Container>
    <MobileFooter />
  </Container>
));
