import React from 'react';

import { storiesOf } from '@storybook/react';

import Divider from '../../../src/components/base/Divider';
import Container from '../../components/Container';

storiesOf('base/Divider', module).add('Summary', () => (
  <Container>
    <Divider />
  </Container>
));
