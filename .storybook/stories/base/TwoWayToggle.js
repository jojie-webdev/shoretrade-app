import React from 'react';

import { storiesOf } from '@storybook/react';

import TwoWayToggle from '../../../src/components/base/TwoWayToggle';
import Container from '../../components/Container';

storiesOf('base/TwoWayToggle', module).add('Summary', () => (
  <Container>
    <TwoWayToggle />
  </Container>
));
