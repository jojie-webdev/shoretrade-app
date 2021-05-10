import React from 'react';

import { storiesOf } from '@storybook/react';

import MobileStickyBottom from '../../../src/components/module/MobileStickyBottom';
import Container from '../../components/Container';

storiesOf('module/MobileStickyBottom', module).add('Summary', () => (
  <Container>
    <MobileStickyBottom />
  </Container>
));
